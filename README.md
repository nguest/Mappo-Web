# Mappo web interface

A web interface for Mappo, to display JSON and IGC (paragliding) GPS tracks on a map, and allow upload of new tracks via a RESTful API. Backend in Go and frontend in React. In order to serve pre-built client JS and CSS files from webpack, wwhose names are not static, the Go server reads the relevant filenames from `asset-manifest.json` and passes them to the html template for rendering. Updating the frontend build requires just a server restart, and meantime a development setup can co-exist at the traditional `http://localhost:3000` .

Tools used:
* React / Redux, for clientside rendering
* Golang for backend and APIs
* Postgres for database
* [Google Cloud Storage](https://cloud.google.com/storage), for storage of uploaded files
* [Mapbox GL API](https://docs.mapbox.com/mapbox-gl-js/) for 2D mapping 
* [Mapbox location API](https://docs.mapbox.com/api/search/), for retrieval of placenames from coordinates
* [Cesium.js](https://cesium.com/cesiumjs/) for 3D mapping
* [D3.js](https://d3js.org/) for 2D graphing

![screenshot](https://github.com/nguest/mappo-web/blob/master/client/public/screenshots/screenshot1.png)

See the app demo hosted here: [https://mappo-web.herokuapp.com/](https://mappo-web.herokuapp.com/)

## Install & run locally

Clone the repo:

```
$ git clone https://github.com/nguest/Mappo-Web.git
$ cd mappo-web
```

There are two parts:

## CLIENT SIDE

The client side which is built as below,

```
$ cd client
$ yarn
$ yarn build
```

You will also need to create two environment variables, which should be available from the shell in which you start the app:

```
MAPBOX_API_KEY=<xxxx>
CESIUM_ACCESS_TOKEN=<xxxx>
```

## SERVER SIDE

## Create a Postgresql DB

You will need Postgres to be installed and running, e.g via `brew install postgresql`

```
$ createDB mappo
```

The server  can be run in a number of different ways, e.g.:

```
$ cd ..
$ go run *.go
```

## SEE IT IN ACTION

Visit [http://localhost:10000](http://localhost:10000) in your browser

## Todo

* ~Upload trackfiles to server~
* Build ~IGC~ and JSON file parsers
* ~Display tracks in a list and get track details for display on the map on listitem click~
* ~Altitude graph in D3~
* Implement API Authentication
* 3D Mapping with Cesium
* Calculate [FAI and OLC triangle](https://github.com/nguest/line-simplify) and other flightypes
* ~Save & retrieve tracks to/from cloud storage~
* ~Implement SPA router clientside~
