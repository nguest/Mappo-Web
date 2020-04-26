package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path"

	"github.com/nguest/mappo-web/router"
	"github.com/nguest/mappo-web/server"
	"github.com/nguest/mappo-web/utils/tracks"

	"github.com/nguest/mappo-web/models"
)

func worker(c <-chan models.CResult, db *sql.DB) {
	fmt.Println("Register the worker")
	for i := range c {
		fmt.Println("worker START processing job")
		opt := tracks.LeonardoOptimize(i.TrackData.Data)
		fmt.Println("OPT", opt)
		models.PatchOptimizations(db, i.UUID, opt)
		fmt.Println("worker FINISHED processing job")
	}
}

func main() {
	db, err := models.ConnectDB()
	if err != nil {
		log.Panic(err)
	}
	defer db.Close()

	buildPath := path.Clean("client/build")
	buildURL := path.Clean(fmt.Sprintf("/%s/", buildPath))

	//c := make(chan []tracks.Datum)
	//var x []tracks.Datum

	var c chan models.CResult

	c = make(chan models.CResult, 100)
	go worker(c, db)

	env := &server.Env{
		BuildPath: buildPath,
		BuildURL:  buildURL,
		DB:        db,
	}

	r := router.CreateNew(env, c)

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "10000"
	}
	fmt.Printf("Go server started on port %s\n", port)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), r))

}
