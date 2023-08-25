.PHONY: all
all:
	npx tailwindcss -i ./assets/global.css -o ./public/global.css --minify
	go build

.PHONY: clean
clean:
	rm -f ./public/global.css
	rm -f ./go-htmx-tailwind-template

.PHONY: run
run:
	DEV=true air

.PHONY: css
css:
	npx tailwindcss -i ./assets/global.css -o ./public/global.css --watch --minify