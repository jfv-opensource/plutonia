FROM python:3.13-slim

RUN apt update \
 && apt install -y curl libmariadb-dev gcc \
 && pip install --upgrade pip \
 && pip install -qU flask-cors \
 && pip install -qU flask \
 && pip install -qU tiktoken \
 && pip install -qU bs4 \
 && pip install -qU langchain-community \
 && pip install -qU lxml \
 && pip install -qU ollama \
 && pip install -qU requests \
 && pip install -qU langchain-ollama

WORKDIR /work
COPY files /work

RUN echo "API_VERSION=$(date +\"%Y%m%d.%H.%M.%S\")" > /work/helpers/version.py

CMD  ["./start.sh"]