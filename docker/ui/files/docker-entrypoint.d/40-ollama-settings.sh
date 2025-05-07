#!/bin/sh

if [ -z "$OLLAMA_PROXY_API_URL" ];
then
    echo "============================================================================="
    echo "ERROR: PARAMETER 'OLLAMA_PROXY_API_URL' is not set"
    echo "============================================================================="
else
    echo "var OLLAMA_PROXY_API_URL='$OLLAMA_PROXY_API_URL'" >> /usr/share/nginx/html/assets/js/ollama-settings.js
fi

if [ -z "$UI_TITLE" ];
then
    echo "var UI_TITLE='Chat with YourDev'" >> /usr/share/nginx/html/assets/js/ollama-settings.js
else
    echo "var UI_TITLE='$UI_TITLE'" >> /usr/share/nginx/html/assets/js/ollama-settings.js
fi

if [ "$UI_DISPLAY_FEEDBACK" = "false" ];
then
    echo "var UI_DISPLAY_FEEDBACK=false" >> /usr/share/nginx/html/assets/js/ollama-settings.js
else
    echo "var UI_DISPLAY_FEEDBACK=true" >> /usr/share/nginx/html/assets/js/ollama-settings.js
fi