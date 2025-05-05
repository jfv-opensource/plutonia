""" 
Module: settings
"""

import os

# GENERAL PARAMETERS

OLLAMA_API_URL=os.environ.get('OLLAMA_API_URL',"http://127.0.0.1:11434")
OLLAMA_QUERY_MODELS_TMP=os.environ.get('OLLAMA_QUERY_MODELS','')
OLLAMA_QUERY_MODELS=OLLAMA_QUERY_MODELS_TMP.split(',')
OLLAMA_QUERY_DEFAULT_MODEL=os.environ.get('OLLAMA_QUERY_DEFAULT_MODEL','')

# TOOLS PARAMETERS

OLLAMA_TOOLS_MODEL_NAME = os.environ.get('OLLAMA_TOOLS_MODEL_NAME',
                                         OLLAMA_QUERY_DEFAULT_MODEL)
OLLAMA_TOOLS_API_URL = os.environ.get('OLLAMA_TOOLS_API_URL',
                                      OLLAMA_API_URL)

OLLAMA_TOOLS_DEBUG=os.environ.get('OLLAMA_TOOLS_DEBUG',"False")
if OLLAMA_TOOLS_DEBUG in ( "True", "true"):
    OLLAMA_TOOLS_DEBUG=True
else:
    OLLAMA_TOOLS_DEBUG=False
