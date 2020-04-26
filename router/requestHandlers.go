package router

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/nguest/mappo-web/server"
	"github.com/nguest/mappo-web/utils/files"
	"github.com/nguest/mappo-web/utils/location"
	"github.com/nguest/mappo-web/utils/tracks"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/nguest/mappo-web/models"
)

// GetAllItems returns all items from the preset table and JSON encodes them.
func GetAllItems(env *server.Env) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		if r.Method != "GET" {
			http.Error(w, http.StatusText(405), 405)
			return
		}
		items, err := models.GetAllItems(env.DB)
		if err != nil {
			fmt.Println("ERROR GET", err)
			http.Error(w, http.StatusText(500), 500)
			return
		}
		json.NewEncoder(w).Encode(items)
	})
}

// GetItem returns a single item with ID from the preset table and JSON encodes it.
func GetItem(env *server.Env) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		if r.Method != "GET" {
			http.Error(w, http.StatusText(405), 405)
			return
		}

		params := mux.Vars(r)
		ID := params["ID"]

		query := r.URL.Query()

		item, err := models.GetItem(env.DB, ID)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
			log.Println(err)
			return
		}
		if query != nil {

			trackData, err := files.ReadAndParse(item.Filepath, true, nil)
			if err != nil {
				log.Println(err)
			}

			item.Data = trackData.Data // if it is saved track, we just need the data property
			item.BoundingBox = trackData.BoundingBox

			json.NewEncoder(w).Encode(item)
			return
		}

		json.NewEncoder(w).Encode(item)
	})
}

// UpdateItem updates a single item with ID from the preset table and returns it, JSON encoded.
func UpdateItem(env *server.Env) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "PUT" {
			http.Error(w, http.StatusText(405), 405)
			return
		}
		params := mux.Vars(r)
		ID := params["ID"]
		decoder := json.NewDecoder(r.Body)
		updatedItem := models.Item{}
		err := decoder.Decode(&updatedItem)

		item, err := models.UpdateItem(env.DB, ID, updatedItem)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
			log.Println(err)
			return
		}
		json.NewEncoder(w).Encode(item)
	})
}

// func worker(c <-chan []tracks.Datum) {
// 	fmt.Println("Register the worker")
// 	fmt.Println("c", c)
// 	var x []tracks.Datum
// 	x <- c
// 	//x := tracks.LeonardoOptimize()
// 	//fmt.Println("x", x)
// }

// CreateItem creates a new Item and returns it, JSON encoded.
func CreateItem(env *server.Env, c chan models.CResult) http.Handler {

	// c := make(chan []tracks.Datum)
	// go worker(c)
	// fmt.Println("return JSON")

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Error(w, http.StatusText(405), 405)
			return
		}
		decoder := json.NewDecoder(r.Body)
		newItem := models.Item{}
		err := decoder.Decode(&newItem)
		newItem.CreatedAt = time.Now()
		item, err := models.CreateItem(env.DB, newItem)

		fmt.Println("Beginning Optimizations")

		if err != nil {
			http.Error(w, http.StatusText(500), 500)
			log.Println(err)
			return
		}

		json.NewEncoder(w).Encode(item)

		//x := <-c // receive from c
		//trackData.Optimizations = go tracks.LeonardoOptimize(data)
		//fmt.Println("trackData.Optimizations", x)
	})
}

// DeleteItem deletes an Item of ID
func DeleteItem(env *server.Env) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		if r.Method != "DELETE" {
			http.Error(w, http.StatusText(405), 405)
			return
		}

		params := mux.Vars(r)
		ID := params["ID"]

		// delete from DB
		filepath, err := models.DeleteItem(env.DB, ID)
		// delete relevant file from google storage
		err = files.DeleteCloudFile(filepath)
		if err != nil {
			fmt.Println("Could not delete file: ", filepath)
		}
	})
}

// UploadFile receives a file as multipart form data, creates new Item and returns it.
func UploadFile(env *server.Env, c chan models.CResult) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		fmt.Println("UPLOADING")

		r.ParseMultipartForm(10 << 20) // 10 << 20 specifies a maximum upload of 10 MB files.

		file, header, err := r.FormFile("file")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer file.Close()
		fmt.Printf("Uploaded File: %+v\n", header.Filename)
		fmt.Printf("File Size: %+v\n", header.Size)
		fmt.Printf("MIME Header: %+v\n", header.Header)

		s := strings.Split(header.Filename, ".")
		filetype := strings.ToLower(s[len(s)-1])

		isCloudUpload := true
		var relFilePath string
		//
		if isCloudUpload {
			path, _ := files.UploadFileToCloud(file, header)
			fmt.Println("UPLOADED", path)
			relFilePath = path
		} else {

			dir, err := os.Getwd() // working project directory
			relDir := "temp-files/"
			saveDir := fmt.Sprintf("%s/%s", dir, relDir)

			// Create a temporary file within our saveDir directory that follows naming pattern
			tempFile, err := ioutil.TempFile(saveDir, fmt.Sprintf("upload-*.%s", filetype))
			if err != nil {
				fmt.Println("tempfile", err)
			}
			defer tempFile.Close()

			fileBytes, err := ioutil.ReadAll(file) // read all of the contents of our uploaded file into a byte array
			if err != nil {
				fmt.Println("fileBytes error", err)
			}

			tempFile.Write(fileBytes) // write this byte array to our temporary file
			relFilePath = fmt.Sprintf("%s%s", relDir, filepath.Base(tempFile.Name()))

		}

		// Parse file and get the dets:
		var trackdata tracks.TrackData

		switch filetype {
		case "igc":
			trackdata, err = files.ReadAndParse(relFilePath, isCloudUpload, c)
		case "json":
			trackdata, err = files.GetJSONFileContents(relFilePath)
		default:
			fmt.Println("Filetype not accepted")
			http.Error(w, http.StatusText(422), 422)
			return
		}
		var nulltrack []tracks.Datum
		newUUID := uuid.Must(uuid.NewRandom()).String()

		//go tracks.LeonardoOptimize(trackdata.Data, c, models.PatchOptimizations(db, newUUID, trackdata.Data))

		newItem := models.Item{
			UUID:             newUUID,
			Data:             nulltrack,
			Filepath:         relFilePath,
			Date:             trackdata.Date,
			StartEndDistance: trackdata.StartEndDistance,
		}
		newItem.Location = location.GetTrackLocation(newItem)

		// save to DB, return new item
		fmt.Println("CREATE ITEM")
		savedItem, err := models.CreateItem(env.DB, newItem)
		if err != nil {
			fmt.Fprintf(w, "Failed to Uploaded File\n")
		}
		//go tracks.LeonardoOptimize(trackdata.Data, c)
		cRes := models.CResult{
			TrackData: trackdata,
			UUID:      newUUID,
		}
		c <- cRes
		err = json.NewEncoder(w).Encode(savedItem)
		//fmt.Println("JSSSSSOONNN", err)
		// if err == nil {
		// 	x := <-c
		// 	fmt.Println("xxxxx", x)
		// }
	})
}

func homePage(w http.ResponseWriter, r *http.Request) {
	log.Println(w, "index.html loaded")
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
