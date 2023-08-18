package main

import (
	"embed"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/template/django/v3"
)

var (
	//go:embed views/*
	views embed.FS
	//go:embed public/*
	public embed.FS
)

func main() {
	app := createApp()
	if os.Getenv("DEV") == "true" {
		app = createAppDev()
	}

	initRoutes(app)

	log.Fatal(app.Listen("0.0.0.0:8080"))
}

// createApp creates a fiber app with embedded views and assets
func createApp() *fiber.App {
	engine := django.NewPathForwardingFileSystem(http.FS(views), "/views", ".html")
	app := fiber.New(fiber.Config{
		Views:             engine,
		PassLocalsToViews: true,
	})
	app.Use("/public", filesystem.New(filesystem.Config{
		Root:       http.FS(public),
		PathPrefix: "public",
	}))
	return app
}

// createAppDev creates a fiber app that reads views and assets from disk
func createAppDev() *fiber.App {
	engine := django.New("./views", ".html")
	engine.Reload(true)
	app := fiber.New(fiber.Config{
		Views:             engine,
		PassLocalsToViews: true,
	})
	app.Static("/public", "./public", fiber.Static{
		CacheDuration: -1,
	})
	return app
}

func initRoutes(app *fiber.App) {
	app.Use(func(c *fiber.Ctx) error {
		c.Locals("PathName", c.Path())
		return c.Next()
	})

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{})
	})

	app.Get("/about", func(c *fiber.Ctx) error {
		return c.Render("about", fiber.Map{})
	})

	app.Get("/blog", func(c *fiber.Ctx) error {
		return c.Render("blog", fiber.Map{})
	})
}
