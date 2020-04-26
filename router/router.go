package router

import (
	"net/http"

	"github.com/nguest/mappo-web/models"
	"github.com/nguest/mappo-web/server"

	"github.com/gorilla/mux"
)

// CreateNew creates new mux router and returns it
func CreateNew(env *server.Env, c chan models.CResult) *mux.Router {
	r := mux.NewRouter().StrictSlash(true)

	// handle static assets only
	r.PathPrefix(env.BuildURL).Handler(http.StripPrefix(env.BuildURL, http.FileServer(http.Dir(env.BuildPath))))

	// handle everything else
	for _, route := range routes(env, c) {
		r.
			Methods(route.Method).
			PathPrefix(route.Pattern).
			Name(route.Name).
			Handler(route.Handler)
	}

	return r
}
