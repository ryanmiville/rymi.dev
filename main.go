package main

import (
	"embed"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/a-h/templ"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/ryanmiville/rymi.dev/components"
	"github.com/ryanmiville/rymi.dev/markdown"
)

var (
	//go:embed public/*
	public embed.FS
	//go:embed posts/*
	posts embed.FS
)

func main() {
	app := createApp()
	markdown.FS = posts
	initRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Fatal(app.Listen("0.0.0.0:" + port))
}

// createApp creates a fiber app with embedded assets
func createApp() *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler: ErrorHandler,
	})
	app.Use("/public", filesystem.New(filesystem.Config{
		Root:       http.FS(public),
		PathPrefix: "public",
	}))
	return app
}

func initRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return Render(components.Home(c), c)
	})

	app.Get("/about", func(c *fiber.Ctx) error {
		return Render(components.About(c), c)
	})

	app.Get("/blog", func(c *fiber.Ctx) error {
		posts, err := markdown.Posts()
		if err != nil {
			return err
		}
		return Render(components.Blog(c, posts), c)
	})

	app.Get("/blog/:slug", func(c *fiber.Ctx) error {
		name := fmt.Sprintf("posts/%s.md", c.Params("slug"))
		content, err := markdown.Parse(name)
		if err != nil {
			return err
		}

		return Render(components.BlogPost(c, content), c)
	})
}

func Render(comp templ.Component, c *fiber.Ctx) error {
	c.Context().SetContentType(fiber.MIMETextHTMLCharsetUTF8)
	return comp.Render(c.Context(), c)
}
