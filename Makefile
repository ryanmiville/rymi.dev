all:
	npx tailwindcss -i ./assets/global.css -o ./public/global.css --minify
	go build

clean:
	rm -f ./public/global.css
	rm -f ./rymi.dev

css:
	npx tailwindcss -i ./assets/global.css -o ./public/global.css --watch --minify

run:
	concurrently "air" "make css"
