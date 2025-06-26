JEKYLL_VERSION := 4.2.2
docker = docker
PWD = $(shell pwd)

build:
	sudo ${docker} run --rm --volume="${PWD}:/srv/jekyll" -it jekyll/jekyll:${JEKYLL_VERSION} jekyll build

serve:
	sudo ${docker} run --rm --name pbrucla --volume="${PWD}:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll:${JEKYLL_VERSION} jekyll serve --watch --drafts

.PHONY: build serve
