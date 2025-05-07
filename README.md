# PlutonIA

![Logo](https://cdn2.iconfinder.com/data/icons/solar_system_png/512/Pluto.png)

## **Prerequisites**
Before using this service, ensure the following are installed and configured:
1. **Docker** (latest version)
2. **Make** (command-line build tool)
3. **curl** (for API testing)
4. **[Ollama](https://ollama.com/)** with the wanted [models](https://ollama.com/search?c=tools).

### API

| Parameter | Description | Default value |
| --------- | ----------- | ------------- |
|OLLAMA_API_URL| API of Ollama |None |
|OLLAMA_QUERY_MODELS| List of models to use with comma separation |None |
|OLLAMA_QUERY_DEFAULT_MODEL| The default model to use, it should support tools calling feature|None |
|OLLAMA_TOOLS_MODEL_NAME| The model to use for tools_calling, it may be different from the OLLAMA_QUERY_DEFAULT_MODEL but must support tools calling. Note the size of the two models shoukd be lower than the GPU RAM else loading model time will reduce performance.|None |
|OLLAMA_TOOLS_API_URL| API of Ollama fro tools calling if different from OLLAMA_API_URL|None |
|OLLAMA_TOOLS_DEBUG| Display debug logs in console |False|

### UI

| Parameter | Description | Default value |
| --------- | ----------- | ------------- |
| OLLAMA_PROXY_API_URL | URL of the PlutonIA API |None |
| UI_TITLE | Title of the windows |PlutonIA|

## Run

~~~ yaml
version: "3.1"

services:
  ollama-ui:
    image: jfvopensource/plutonia-ui
    restart: always
    ports:
      - '5001:80'
    environment:
      - OLLAMA_PROXY_API_URL=http://172.18.0.1:5000
      - UI_TITLE=PlutonIA

  ollama-api:
    image: jfvopensource/plutonia-api
    restart: always
    ports:
      - '5000:5000'
    environment:
    - OLLAMA_API_URL=http://172.18.0.1:11434
    - OLLAMA_QUERY_MODELS=llama3.1,llama3.2,mistral,gemma2,smollm2,qwen2.5,deepscaler,openthinker,deepseek-r1
    - OLLAMA_QUERY_DEFAULT_MODEL=llama3.2
    - OLLAMA_TOOLS_ENABLED=True
    - OLLAMA_TOOLS_DEBUG=true
    - OLLAMA_TOOLS_MODEL_NAME=qwen2.5:3b
~~~

Edit the docker compose with :
* the correct IP addresses `172.18.0.1` may be replaced.
* the models to allow (must be present on the ollama instance).
* the default model name (must be present on the instance).
* the tool model name (must be present on the instance).

Then run the command:

~~~bash
docker compose up
~~~


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

It can call external API, local python functions...

Container **must** be restarted to load new tools.