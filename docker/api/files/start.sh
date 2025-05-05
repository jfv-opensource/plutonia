#! /bin/bash


if [ "${HTTPS_PROXY_URL}" ];
then
    export https_proxy="${HTTPS_PROXY_URL}"
    export HTTPS_PROXY="${HTTPS_PROXY_URL}"
    echo "Set https_proxy=${HTTPS_PROXY_URL}"
fi

if [ "${NO_PROXY}" ];
then
    export no_proxy="${NO_PROXY}"
    export NO_PROXY="${NO_PROXY}"
    echo "Set no_proxy=${NO_PROXY}"
fi

flask --app main run --host=0.0.0.0 
