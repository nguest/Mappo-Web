package models

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"time"

	"github.com/nguest/mappo-web/utils/tracks"

	"github.com/lib/pq"
)

type Item struct {
	ID               string
	UUID             string
	Data             []tracks.Datum
	Filepath         string
	Date             time.Time
	StartEndDistance float64
	Location         string
	BoundingBox      tracks.BoundingBox
	CreatedAt        time.Time
	Optimized        tracks.OptimizedFlight
}

type CResult struct {
	TrackData tracks.TrackData
	UUID      string
}

// GetAllItems : return all items (unpaged so far)
func GetAllItems(db *sql.DB) ([]*Item, error) {
	createTablesIfNotExist(db)

	sqlStatement := `SELECT 
    "Id",
		"Uuid",
		COALESCE ( NULLIF ("Data", ''), ''),
    COALESCE ( NULLIF ("Filepath", ''), ''),
    "Date",
    "StartEndDistance",
		COALESCE ( NULLIF ("Location", ''), ''),
		"CreatedAt",
		COALESCE (NULLIF ("Optimized", ''), '')
		FROM tracks
		ORDER BY "CreatedAt" DESC;`
	rows, err := db.Query(sqlStatement)

	if err, ok := err.(*pq.Error); ok {
		fmt.Println("pq error:", err.Code.Name())
	}

	defer rows.Close()

	items := make([]*Item, 0)
	for rows.Next() {
		item := new(Item)
		var rawOptimized string
		var rawData string
		err := rows.Scan(&item.ID, &item.UUID, &rawData, &item.Filepath, &item.Date, &item.StartEndDistance, &item.Location, &item.CreatedAt, &rawOptimized)
		if err != nil {
			return nil, err
		}
		var parsedOptimized tracks.OptimizedFlight
		if len(rawOptimized) != 0 {
			err = json.Unmarshal([]byte(rawOptimized), &parsedOptimized)
			item.Optimized = parsedOptimized
		}
		var parsedData []tracks.Datum
		if len(rawData) != 0 {
			err = json.Unmarshal([]byte(rawData), &parsedData)
			item.Data = parsedData
		}

		items = append(items, item)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

// GetItem : return Item by Id
func GetItem(db *sql.DB, ID string) (*Item, error) {
	sqlStatement := `SELECT
    "Id",
		"Uuid",
		COALESCE (NULLIF ("Data", ''), ''),
    COALESCE (NULLIF ("Filepath", ''), ''),
    "Date",
    "StartEndDistance",
		COALESCE ( NULLIF ("Location", ''), ''),
		"CreatedAt",
		COALESCE (NULLIF ("Optimized", ''), '')
    FROM tracks WHERE "Id"=$1;`
	row := db.QueryRow(sqlStatement, ID)

	item := new(Item) // here var item *Item is wrong- why?
	var rawOptimized string
	var rawData string

	err := row.Scan(&item.ID, &item.UUID, &rawData, &item.Filepath, &item.Date, &item.StartEndDistance, &item.Location, &item.CreatedAt, &rawOptimized)

	var parsedOptimized tracks.OptimizedFlight
	if len(rawOptimized) != 0 {
		err = json.Unmarshal([]byte(rawOptimized), &parsedOptimized)
		item.Optimized = parsedOptimized
	}
	var parsedData []tracks.Datum
	if len(rawData) != 0 {
		err = json.Unmarshal([]byte(rawData), &parsedData)
		item.Data = parsedData
	}

	switch err {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
		return nil, err
	case nil:
		return item, err
	default:
		panic(err)
	}
}

// GetItemDetails : get FilePath of Item by Id for parsing
func GetItemDetails(db *sql.DB, ID string) (string, error) {
	sqlStatement := `SELECT "Filepath" FROM tracks WHERE "Id"=$1;`
	row := db.QueryRow(sqlStatement, ID)

	var filepath string
	err := row.Scan(&filepath)

	// get contents of file and return
	return filepath, err
}

// UpdateItem : update entire Item by way of PUT
func UpdateItem(db *sql.DB, ID string, item Item) (*Item, error) {
	fmt.Println("UpdateItem", item)
	sqlStatement := `
    UPDATE tracks
    SET "Uuid" = $2, "Filepath" = $3, "Date", = $4, "StartEndDistance" = $5,
    WHERE "Id" = $1
    RETURNING "Id", "Uuid", Filepath", "Date", "StartEndDistance", "Location";`
	row := db.QueryRow(sqlStatement, ID, item.UUID, item.Data, item.Filepath, item.Date, item.StartEndDistance)
	i := new(Item) // here var item *Item is wrong- why?
	err := row.Scan(&i.ID, &i.UUID, &i.Data, &i.Filepath, &i.Date, &i.StartEndDistance, &i.Location, &i.CreatedAt)
	if err != nil {
		// deal with properly
		panic(err)
	}
	return i, err
}

func PatchOptimizations(db *sql.DB, UUID string, optimized tracks.OptimizedFlight) (*Item, error) {
	fmt.Println("Patch UUID", UUID)
	sqlData, _ := json.Marshal(optimized)
	fmt.Println("sqlData", string(sqlData))
	sqlStatement := `
    UPDATE tracks
    SET "Optimized" = $1
    WHERE "Uuid" = $2
		RETURNING "Id", "Uuid", "Optimized";` //, "Filepath", "Date", "StartEndDistance";` //, "Location", "CreatedAt";`
	//fmt.Println(sqlStatement)
	row := db.QueryRow(sqlStatement, string(sqlData), UUID)
	i := new(Item)
	var rawOptimized string

	err := row.Scan(&i.ID, &i.UUID, &rawOptimized) //, &i.Filepath, &i.Date, &i.StartEndDistance) // &i.Location, &i.CreatedAt)

	var parsedOptimized tracks.OptimizedFlight
	err = json.Unmarshal([]byte(rawOptimized), &parsedOptimized)
	i.Optimized = parsedOptimized

	if err != nil {
		panic(err)
	}
	return i, err
}

// DeleteItem : delete Item by ID / TODO also delete relevant file upload
func DeleteItem(db *sql.DB, ID string) (string, error) {
	sqlStatement := `
    DELETE FROM tracks
		WHERE "Id" = $1
		RETURNING "Filepath";`
	row := db.QueryRow(sqlStatement, ID)
	var filepath string
	err := row.Scan(&filepath)
	if err != nil {
		panic(err)
	}
	return filepath, err
}

// CreateItem : create new Item
func CreateItem(db *sql.DB, item Item) (Item, error) {
	fmt.Println("models.CreateItem")
	sqlStatement := `
    INSERT INTO tracks ("Uuid", "Filepath", "Date", "StartEndDistance", "Location", "CreatedAt")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING "Id", "Uuid", "Filepath", "Date", "StartEndDistance", "Location", "CreatedAt";`
	savedItem := Item{}

	err := db.QueryRow(
		sqlStatement,
		item.UUID,
		item.Filepath,
		item.Date,
		item.StartEndDistance,
		item.Location,
		time.Now()).
		Scan(
			&savedItem.ID,
			&savedItem.UUID,
			&savedItem.Filepath,
			&savedItem.Date,
			&savedItem.StartEndDistance,
			&savedItem.Location,
			&savedItem.CreatedAt,
		)
	if err != nil {
		panic(err)
	}

	return savedItem, err
}

func createTablesIfNotExist(db *sql.DB) {
	sqlStatement := `CREATE TABLE IF NOT EXISTS tracks(
		"Id" SERIAL PRIMARY KEY,
		"Uuid" TEXT,
		"Data" TEXT,
		"Filepath" TEXT,
		"Date" DATE,
		"StartEndDistance" FLOAT8,
		"Location" TEXT,
		"CreatedAt" DATE,
		"Optimized" TEXT
	)`
	db.Exec(sqlStatement)
}
