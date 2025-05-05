# Pylint rules
# pylint: disable=superfluous-parens
# pylint: disable=invalid-name
# pylint: disable=unused-argument
# pylint: disable=broad-exception-caught

""" 
Module: tools
"""
import os
import importlib
from time import time_ns
from ollama import ChatResponse
from ollama import Client

from helpers.settings import OLLAMA_TOOLS_MODEL_NAME
from helpers.settings import OLLAMA_TOOLS_API_URL
from helpers.settings import OLLAMA_TOOLS_DEBUG
from helpers.logs import log_message

def prepare_tools_calling(prompt,user_model):
    """ Query the model with the tools list to check if a tool call
        is needed.
    """

    model = user_model
    if OLLAMA_TOOLS_MODEL_NAME is not None:
        model = OLLAMA_TOOLS_MODEL_NAME

    try:
        response: ChatResponse = tools_client.chat(model=model, messages=[
            {
                'role': 'user',
                'content': prompt,
                'options': {
                    'temperature':0
                }
            } ],
            tools=tools_list,
        )

        result=response.message.content
        tool_calls = response.message.tool_calls
    except ChatResponse.ResponseError:
        if OLLAMA_TOOLS_DEBUG is True:
            log_message("Model does not support tools")
        return None,None

    if tool_calls is not None and tool_calls != 'no_tool':
        if OLLAMA_TOOLS_DEBUG is True:
            log_message("+++++++++++++ Calling tool:" + str(tool_calls))
            log_message(str(result))
        return tool_calls,response

    if OLLAMA_TOOLS_DEBUG is True:
        log_message("-------------- No tools called")

    return None,None

def call_tool(response):
    """
    Call the tool referenced in the response and return the result
    """
    if response.message.tool_calls:
        log_message(str(response.message.tool_calls))
        for tool in response.message.tool_calls:
            if function_to_call := available_tools_list.get(tool.function.name):
                try:
                    if OLLAMA_TOOLS_DEBUG is True:
                        log_message(
                            "================================================================="
                            )
                        log_message('Calling function:'
                                    +str(tool.function.name))
                        log_message('Arguments:'+str(tool.function.arguments))
                        log_message('Function output:'
                                    +str(function_to_call(**tool.function.arguments)))

                    tool_result=function_to_call(**tool.function.arguments)
                    if OLLAMA_TOOLS_DEBUG is True:
                        log_message(str(tool_result))
                        log_message(
                            "================================================================="
                            )
                    return str(tool_result)
                except Exception:
                    log_message('Function call error:'+tool.function.name)
    return ""

def get_tool_prompt(user_prompt,query_selected_model_name):
    """ 
    Generate the tools calling prompt from the original prompt. If no tool is used,
    returns the original prompt.
    """
    tool_prompt_time_start=time_ns()

    callable_tool, tool_call_response = prepare_tools_calling(user_prompt,query_selected_model_name)

    current_tool = ""
    if callable_tool is not None:
        for tool_call in callable_tool:
            current_tool = tool_call.function.name

    if callable_tool is None or current_tool == 'no_tool' or current_tool == "":
        tool_prompt_time_stop=time_ns()
        if OLLAMA_TOOLS_DEBUG is True:
            tool_prompt_duration = tool_prompt_time_stop - tool_prompt_time_start
            log_message("Tools call analysis duration:"+convert_time(tool_prompt_duration))

        return user_prompt

    tool_call_result = ""
    tool_call_result = call_tool(tool_call_response)
    if OLLAMA_TOOLS_DEBUG is True:
        log_message(str(tool_call_result))

    tool_template = f"""
    ### Task:
    Respond to the user query '{user_prompt}' using the provided tool
    call answer '{tool_call_result}'

    ### Guidelines:
    - If you don't know the answer, clearly state that.
    - If uncertain, ask the user for clarification.
    - Respond in the same language as the user's query.
    - If the result is unreadable or of poor quality, inform the user
    and provide the best possible answer.
    - If the answer isn't present in the tool result but you possess the knowledge,
    explain this to the user and provide the answer using your own understanding.
    - Do not use XML or json tags in your response.

    ### Output:
    Provide a clear and direct response to the user's query.
    """

    tool_prompt_time_stop=time_ns()

    if OLLAMA_TOOLS_DEBUG is True:
        tool_prompt_duration = tool_prompt_time_stop - tool_prompt_time_start
        log_message("Tools call analysis duration:"+convert_time(tool_prompt_duration))

    return tool_template


def no_tool() -> None:
    """ Fake function to have a function in the list if no function have to be called
    """
    return None

def load_tools():
    """
    Load tools from the directory /tools
    """

    available_functions = {}
    tools=[ no_tool]

    for file in os.listdir('tools/'):
        if file.endswith('.py') and file.startswith('tool_'):
            if OLLAMA_TOOLS_DEBUG is True:
                log_message("tool candidate:" + file)
            module_name='tools.'+file.replace('.py','')
            if OLLAMA_TOOLS_DEBUG is True:
                log_message("tool registered:" + module_name)
            module = importlib.import_module(module_name)
            globals().update(vars(module))

            if hasattr(module, "signature"):
                signature = module.signature()
                if isinstance( signature, dict):
                    available_functions = available_functions | signature
                    tools += signature.values()
    return tools,available_functions

tools_client = Client(
    host=OLLAMA_TOOLS_API_URL)
#   host=ollama_tools_api_url)

def convert_time(nanos):
    """
    Converts a time from nanoseconds to seconds, milliseconds, or nanoseconds.

    Args:
        nanos (int): The time in nanoseconds to convert.

    Returns:
        str: The most relevant conversion of the time.
    """

    if not isinstance(nanos, (int, float)):
        raise TypeError("nanos must be a numeric value (int or float)")

    if nanos >= 1_000_000_000:
        return f"{nanos / 1_000_000_000:.2f} seconds"
    if nanos >= 1_000_000:
        return f"{nanos / 1_000_000:.2f} milliseconds"
    if nanos >= 1_000:
        return f"{nanos / 1_000:.2f} microseconds"
    return f"{nanos} nanoseconds"

tools_list, available_tools_list = load_tools()
