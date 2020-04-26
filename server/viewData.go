package server

import "github.com/nguest/mappo-web/webpack"

// User represents current user session (example)
type User struct {
	Email     string
	FirstName string
	LastName  string
}

// ViewData contains data for the rendered view
type ViewData struct {
	CurrentUser  User
	BuildPath    string
	assetsMapper webpack.AssetsMapper
}

// NewViewData creates new data for the view (example, this user)
func NewViewData(buildPath string) (ViewData, error) {
	assetsMapper, err := webpack.NewAssetsMapper(buildPath)
	if err != nil {
		return ViewData{}, err
	}

	return ViewData{
		CurrentUser: User{
			Email:     "nick@example.com",
			FirstName: "Nick",
			LastName:  "Example",
		},
		assetsMapper: assetsMapper,
		BuildPath:    buildPath,
	}, nil
}

// Webpack maps file name to path
func (d ViewData) Webpack(file string) string {
	return d.assetsMapper(file)
}
