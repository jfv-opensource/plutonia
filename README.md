![Logo](https://cdn2.iconfinder.com/data/icons/solar_system_png/512/Pluto.png)

# Plutonia

## **Prerequisites**
Before using this service, ensure the following are installed and configured:
1. **Docker** (latest version)
2. **Make** (command-line build tool)
3. **curl** (for API testing)
4. **[Ollama](https://ollama.com/)** with the wanted [models](https://ollama.com/search?c=tools).

## Container parameters

| Parameter | Description | Default value |
| --------- | ----------- | ------------- |
|OLLAMA_API_URL | API of Ollama | None |
|OLLAMA_QUERY_MODELS | List of models to use with comma separation | None |
|OLLAMA_QUERY_DEFAULT_MODEL | The default model to use, it should support tools calling feature| None |
|OLLAMA_TOOLS_MODEL_NAME | The model to use for tools_calling, it may be different from the OLLAMA_QUERY_DEFAULT_MODEL but must support tools calling. Note the size of the two models shoukd be lower than the GPU RAM else loading model time will reduce performance.| None |
|OLLAMA_TOOLS_API_URL| API of Ollama fro tools calling if different from OLLAMA_API_URL| None |
|OLLAMA_TOOLS_DEBUG|Display debug logs in console | False|


## Container run

Debug mode:

~~~bash
docker run -it --name local-api -p 5000:5000 local-api
~~~

Normal mode:

~~~bash
docker run -d --name local-api -p 5000:5000 local-api
~~~

Then update the ollama URL in your favorite UI to **http://localhost:5000**.

## Makefile



## Add tools

Tools are small python files in the **/tools/** directory of the container.

* signature to map a string function name to the function itself.
* the function corresponding to the tool.

~~~python
from datetime import datetime

def signature():
    """
    Doc
    """
    return  { 'mydate': mydate }

def mydate() -> str:
    """
    Return the current date in Paris

    Args:
      None

    Returns:
      current date (Paris)
    """

    current_date = datetime.now().strftime("%Y-%m-%d")

    return current_date
~~~

it can call external API, local python functions...

Container **must** be restarted to load new tools.