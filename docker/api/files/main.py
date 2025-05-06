""" Main """

# Pylint rules
# pylint: disable=superfluous-parens
# pylint: disable=invalid-name
# pylint: disable=unused-argument
# pylint: disable=broad-exception-caught

import json

from time import time_ns
from datetime import datetime
import requests

from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from helpers.settings import OLLAMA_QUERY_MODELS
from helpers.settings import OLLAMA_API_URL
from helpers.settings import OLLAMA_QUERY_DEFAULT_MODEL
from helpers.tools import get_tool_prompt

from helpers.logs import log_message,init_logger
from helpers.version import API_VERSION


app = Flask(__name__)

CORS(app, origins=["*"])
console_logger = init_logger()


def detag_model(name):
    """
    Return the string before the : in the model names
    """
    if not isinstance(name, (str)):
        raise TypeError("name must be a string")

    return name.split(':', 1)[0]

def json_response_maker(current_message,current_status):
    """
    Generate a json structured answer from parameters
    and return it
    """
    response = {
        'message': current_message,
        'status': current_status,
        'timestamp': datetime.now()
    }

    return jsonify(response)

@app.route('/api/tags', methods=['GET'])
def tags():
    """Proxy for /api/tags endpoint of the upstream JSON API.
    returning the same data as the original API but with the same structure and format.
    """
    params = {}
    response = requests.get(f"{OLLAMA_API_URL}/api/tags", params=params, timeout=30)
    response.raise_for_status()

    log_message("Call to /api/tags")

    ollama_models_list=response.json()
    filtered_model_list= {}
    filtered_model_list['models']=[]
    for current_model in ollama_models_list['models']:
        current_model_name=detag_model(current_model['name'])

        if current_model_name in OLLAMA_QUERY_MODELS:
            filtered_model_list['models'].append(current_model)
    return Response(json.dumps(filtered_model_list))

@app.route('/api/version', methods=['GET'])
def version():
    """
    Return the current api version
    """
    return json_response_maker('version is ' + API_VERSION,"success"),200

@app.errorhandler(404)
def page_not_found(error):
    """
    Return the default error message if no
    API corresponds to the call.
    """
    return json_response_maker('unsupported page','error'),404

@app.route('/api/generate', methods=['POST'])
def generate():
    """ Call /api/generate API with RAG improvement
    """
    query_id = str(time_ns())
    query_start=time_ns()

    log_message("Call to /api/generate query_id="+query_id)

    try:
        if request.content_type != 'application/json':
            return jsonify({"error": "Content-Type must be application/json"}), 415
        data = request.get_json()
    except json.JSONDecodeError:
        pass

    user_prompt = request.get_json(force=True)['prompt']
    try:
        session_id = request.get_json(force=True, silent = True)['session_id']
    except KeyError:
        session_id = str(time_ns())

    query_selected_model_name = detag_model(request.get_json(force=True)['model'])
    if query_selected_model_name not in OLLAMA_QUERY_MODELS:
        query_selected_model_name = OLLAMA_QUERY_DEFAULT_MODEL

    result_tools_call = get_tool_prompt(user_prompt,
                                     query_selected_model_name)

    prompt = result_tools_call

    data['prompt']=prompt
    data['system'] = "You are PlutonIA, an helpfull support agent"
    data['options']= {
#        "num_ctx": 8192,
        "temperature":0
    }
    ollama_api_url = f"{OLLAMA_API_URL}/api/generate"
    ollama_response = requests.post(ollama_api_url, json=data, stream=True, timeout=180)

    buffer = ""

    def generate_response():
        nonlocal buffer
        final_response = ""
        for chunk in ollama_response.iter_content(chunk_size=1024):
            if chunk:
                buffer += chunk.decode('utf-8')
                while True:
                    try:
                        json_obj = json.loads(buffer)
                        final_response+=json_obj['response']
                        if json_obj['done'] is True:
                            json_obj['session_id']=session_id
                            json_obj['query_id']=query_id
                            query_stop=time_ns()
                            query_duration_ns=query_stop-query_start
                            json_obj['total_duration']=query_duration_ns

                        buffer = ""
                        yield(json.dumps(json_obj)+"\n")
                    except json.JSONDecodeError:
                        break

    return Response(generate_response(), mimetype='text/event-stream')
