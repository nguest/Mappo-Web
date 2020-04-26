package webpack

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"
)

// AssetsMapper maps asset name to file name
type AssetsMapper func(string) string

// NewAssetsMapper creates assets mapper- read files from react "asset-manifest.json"
func NewAssetsMapper(buildPath string) (AssetsMapper, error) {
	assetsManifestPath := path.Join(buildPath, "asset-manifest.json")
	if _, err := os.Stat(assetsManifestPath); os.IsNotExist(err) {
		fmt.Println("File error:", err)
		return func(file string) string {
			fmt.Println("File", file)
			return file
		}, nil
	}

	content, err := ioutil.ReadFile(assetsManifestPath)

	if err != nil {
		return nil, err
	}

	var manifest map[string]map[string]string

	if err = json.Unmarshal(content, &manifest); err != nil {
		fmt.Println("err: ", err)
		return nil, err
	}

	for _, file := range manifest["files"] {
		if file[:7] == "/static" && file[len(file)-3:] != "map" {
			fmt.Println(file) //print essential files from static build for info
		}
	}

	return func(file string) string {
		return fmt.Sprintf("%s%s", buildPath, manifest["files"][file])
	}, nil
}
