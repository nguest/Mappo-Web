package server

import (
	"database/sql"
	"fmt"
	"net/http"
	"path"
	"text/template"
)

// Env currently contains just db
type Env struct {
	BuildPath string
	BuildURL  string
	DB        *sql.DB
}

// Handler returns http.Handler for server endpoint - renders from template
func Handler(env *Env) http.Handler {
	tmpl, err := template.ParseFiles(path.Join("templates", "index.html"))
	if err != nil {
		return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
			http.Error(res, err.Error(), http.StatusInternalServerError)
		})
	}

	data, err := NewViewData(env.BuildPath)
	fmt.Println("data", data)

	if err != nil {
		return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
			http.Error(res, err.Error(), http.StatusInternalServerError)
		})
	}

	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		if err := tmpl.Execute(res, data); err != nil {
			http.Error(res, err.Error(), http.StatusInternalServerError)
		}
	})
}
