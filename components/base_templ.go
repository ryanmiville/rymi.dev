// Code generated by templ@v0.2.334 DO NOT EDIT.

package components

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import "context"
import "io"
import "bytes"

import "github.com/gofiber/fiber/v2"
import "strings"

func Base(c *fiber.Ctx) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, w io.Writer) (err error) {
		templBuffer, templIsBuffer := w.(*bytes.Buffer)
		if !templIsBuffer {
			templBuffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templBuffer)
		}
		ctx = templ.InitializeContext(ctx)
		var_1 := templ.GetChildren(ctx)
		if var_1 == nil {
			var_1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, err = templBuffer.WriteString("<html class=\"bg-slate-900 text-slate-200 mx-auto\"><head><meta charset=\"UTF-8\"><title>")
		if err != nil {
			return err
		}
		var_2 := `Ryan Miville`
		_, err = templBuffer.WriteString(var_2)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("</title><link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/public/favicon/apple-touch-icon.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/public/favicon/favicon-32x32.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/public/favicon/favicon-16x16.png\"><link rel=\"manifest\" href=\"/public/favicon/site.webmanifest\"><meta name=\"description\" content=\"Web developer and data engineer.\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><link href=\"/public/global.css\" rel=\"stylesheet\"><script src=\"https://unpkg.com/htmx.org@1.9.4\" integrity=\"sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV\" crossorigin=\"anonymous\">")
		if err != nil {
			return err
		}
		var_3 := ``
		_, err = templBuffer.WriteString(var_3)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("</script></head><body>")
		if err != nil {
			return err
		}
		err = Navigation(c.Path()).Render(ctx, templBuffer)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("<main class=\"max-w-5xl lg:mx-auto\">")
		if err != nil {
			return err
		}
		err = var_1.Render(ctx, templBuffer)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("</main></body></html>")
		if err != nil {
			return err
		}
		if !templIsBuffer {
			_, err = templBuffer.WriteTo(w)
		}
		return err
	})
}

func navClass(path string, pattern string) templ.CSSClass {
	if strings.HasPrefix(path, "/blog") {
		path = "/blog"
	}
	if path == pattern {
		return templ.SafeClass("text-purple-400")
	}
	return templ.SafeClass("text-slate-400 hover:text-purple-200")
}

func Navigation(path string) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, w io.Writer) (err error) {
		templBuffer, templIsBuffer := w.(*bytes.Buffer)
		if !templIsBuffer {
			templBuffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templBuffer)
		}
		ctx = templ.InitializeContext(ctx)
		var_4 := templ.GetChildren(ctx)
		if var_4 == nil {
			var_4 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, err = templBuffer.WriteString("<nav id=\"nav\" hx-boost=\"true\" class=\"flex justify-end py-10 px-20 font-mono\">")
		if err != nil {
			return err
		}
		var var_5 = []any{"transition-all bg-clip-text text-xl p-5", navClass(path, `/`)}
		err = templ.RenderCSSItems(ctx, templBuffer, var_5...)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("<a class=\"")
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString(templ.EscapeString(templ.CSSClasses(var_5).String()))
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("\" href=\"/\">")
		if err != nil {
			return err
		}
		var_6 := `home`
		_, err = templBuffer.WriteString(var_6)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("</a>")
		if err != nil {
			return err
		}
		var var_7 = []any{"transition-all bg-clip-text text-xl p-5", navClass(path, `/about`)}
		err = templ.RenderCSSItems(ctx, templBuffer, var_7...)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("<a class=\"")
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString(templ.EscapeString(templ.CSSClasses(var_7).String()))
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("\" href=\"/about\">")
		if err != nil {
			return err
		}
		var_8 := `about`
		_, err = templBuffer.WriteString(var_8)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("</a>")
		if err != nil {
			return err
		}
		var var_9 = []any{"transition-all bg-clip-text text-xl p-5", navClass(path, `/blog`)}
		err = templ.RenderCSSItems(ctx, templBuffer, var_9...)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("<a class=\"")
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString(templ.EscapeString(templ.CSSClasses(var_9).String()))
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("\" href=\"/blog\">")
		if err != nil {
			return err
		}
		var_10 := `blog`
		_, err = templBuffer.WriteString(var_10)
		if err != nil {
			return err
		}
		_, err = templBuffer.WriteString("</a></nav>")
		if err != nil {
			return err
		}
		if !templIsBuffer {
			_, err = templBuffer.WriteTo(w)
		}
		return err
	})
}
