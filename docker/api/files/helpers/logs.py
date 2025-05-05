""" 
Module: logs
"""

import logging
from datetime import datetime
from helpers.settings import OLLAMA_TOOLS_DEBUG


def init_logger():
    """
    Defines and initialize logger
    """

    log_format = '%(message)s'

    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler()
    formatter = logging.Formatter(log_format)
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    return logger

def log_message(message):
    """ Write log message
    """
    if OLLAMA_TOOLS_DEBUG is True:
        current_datetime = datetime.now()
        print(current_datetime.isoformat() +"Z - "+message,flush=True)
