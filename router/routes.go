package router

import (
	"net/http"

	"github.com/nguest/mappo-web/models"
	"github.com/nguest/mappo-web/server"
)

// Route describes an API route & method etc.
type Route struct {
	Name    string
	Method  string
	Pattern string
	Handler http.Handler
}

// Routes is an array of all Route (s).
type Routes []Route

func routes(env *server.Env, c chan models.CResult) Routes {
	return Routes{
		Route{
			"GetItem",
			"GET",
			"/api/{ID}",
			GetItem(env),
		},
		Route{
			"GetAllItems",
			"GET",
			"/api",
			GetAllItems(env),
		},
		Route{
			"CreateItem",
			"POST",
			"/api/create",
			CreateItem(env, c),
		},
		Route{
			"UpdateItem",
			"PUT",
			"/api/{ID}",
			UpdateItem(env),
		},
		Route{
			"DeleteItem",
			"DELETE",
			"/api/{ID}",
			DeleteItem(env),
		},
		Route{
			"UploadItem",
			"POST",
			"/api/upload",
			UploadFile(env, c),
		},
		Route{
			"server",
			"GET",
			"/",
			server.Handler(env),
		},
	}
}
