CONTAINERS ?= api

.PHONY: all build test lint clean debug

all: build test lint

build:
	@for c in $(CONTAINERS); do \
		$(MAKE) CONTAINER=$$c _build & \
	done; \
	wait

test: build
	@for c in $(CONTAINERS); do \
		$(MAKE) CONTAINER=$$c _test & \
	done; \
	wait

lint: build
	@for c in $(CONTAINERS); do \
		$(MAKE) CONTAINER=$$c _lint & \
	done; \
	wait

clean:
	@for c in $(CONTAINERS); do \
		$(MAKE) CONTAINER=$$c _clean & \
	done; \
	wait

.PHONY: _build _test _lint _clean

_build:
	docker build ./docker/$(CONTAINER) -f ./docker/$(CONTAINER)/Dockerfile -t local-$(CONTAINER)

_test:
	docker build ./docker/$(CONTAINER) -f ./docker/$(CONTAINER)/Dockerfile.test -t local-$(CONTAINER)-test
	docker run local-$(CONTAINER)-test

_lint:
	docker build ./docker/$(CONTAINER) -f ./docker/$(CONTAINER)/Dockerfile.lint -t local-$(CONTAINER)-lint
	docker run local-$(CONTAINER)-lint

_clean:
	-docker rmi -f local-$(CONTAINER) local-$(CONTAINER)-test local-$(CONTAINER)-lint 2>/dev/null || true


debug:
	-docker stop local-api
	-docker rm local-api
	docker run -it --name local-api -p 5000:5000 local-api


call:
	curl http://localhost:5000/api/generate -d '{ "model": "qwen2.5", "prompt": "what time is it?"}' -H "Content-Type: application/json"

call2:
	curl http://localhost:5000/api/generate -d '{ "model": "qwen2.5", "prompt": "what is the day today?"}' -H "Content-Type: application/json"