package location

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/nguest/mappo-web/models"
	"github.com/nguest/mappo-web/utils/files"
)

// JSONLocation : location object from mapbox API
type JSONLocation struct {
	Features []JSONFeature `json:"features"`
}

// JSONFeature : feature in the JSONLocation Features array
type JSONFeature struct {
	PlaceName string `json:"place_name"`
	ID        string `json:"id"`
}

// GetTrackLocation returns location "place" string from mapbox API
// https://docs.mapbox.com/api/search/#geocoding
func GetTrackLocation(item models.Item) string {
	trackData, _ := files.ReadAndParse(item.Filepath, true, nil)
	lon := fmt.Sprintf("%f", trackData.Data[0].Lon)
	lat := fmt.Sprintf("%f", trackData.Data[0].Lat)

	url := fmt.Sprintf(
		"https://api.mapbox.com/geocoding/v5/mapbox.places/%s,%s.json?access_token=%s",
		lon, lat, os.Getenv("MAPBOX_API_KEY"))

	r, err := http.Get(url)
	if err != nil {
		fmt.Println("getLocationUrlError", err)
	}
	defer r.Body.Close()

	rd, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	location := JSONLocation{}

	err = json.Unmarshal(rd, &location)

	if err != nil {
		fmt.Println("getLocationError", err)
		return "Edit to add a placename"
	}

	// get correct placename- array can be any length- parse for ID starting "place"
	for _, feature := range location.Features {
		if feature.ID[:5] == "place" {
			return feature.PlaceName
		}
	}

	return "Edit to add a placename"
}

/* example calls:
https://api.mapbox.com/geocoding/v5/mapbox.places/5.960850,45.444767.json?access_token=xxx
https://api.mapbox.com/geocoding/v5/mapbox.places/-76.203483,4.406817.json?access_token=xxx

address:
/geocoding/v5/{endpoint}/{longitude},{latitude}.json
*/
