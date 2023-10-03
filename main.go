package main

import (
	"embed"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/template/html/v2"
	"github.com/ryanmiville/rymi.dev/handler"
)

var (
	//go:embed public/*
	public embed.FS
	//go:embed posts/*
	posts embed.FS
	//go:embed views/*
	views embed.FS
)

func main() {
	h := handler.New(posts)
	app := createApp(h)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Fatal(app.Listen("0.0.0.0:" + port))
}

func createApp(h *handler.Handler) *fiber.App {
	engine := html.NewFileSystem(http.FS(views), ".html")
	app := fiber.New(fiber.Config{
		Views:             engine,
		PassLocalsToViews: true,
		ErrorHandler:      h.Error,
	})
	app.Use("/public", filesystem.New(filesystem.Config{
		Root:       http.FS(public),
		PathPrefix: "public",
	}))
	app.Use(func(c *fiber.Ctx) error {
		p := c.Path()
		if strings.HasPrefix(p, "/blog") {
			p = "/blog"
		}
		c.Locals("Path", p)
		return c.Next()
	})

	app.Get("/", h.Index)
	app.Get("/about", h.About)
	app.Get("/blog", h.Blog)
	app.Get("/blog/:slug", h.BlogPost)

	return app
}
