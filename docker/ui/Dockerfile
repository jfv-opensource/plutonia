FROM nginx

COPY files/ /

RUN echo "UI_VERSION=$(date +\"%Y%m%d.%H.%M.%S\")" > /usr/share/nginx/html/assets/js/ollama-settings.js