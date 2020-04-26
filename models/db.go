package models

import (
	"database/sql"
	"fmt"
	"os"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "nguest"
	password = "postgresql"
	dbname   = "mappo"
)

func ConnectDB() (*sql.DB, error) {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	if len(os.Getenv("DATABASE_URL")) != 0 {
		psqlInfo = os.Getenv("DATABASE_URL")
	}

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected to database `", dbname, "` on port", port)
	if err != nil {
		return nil, err
	}

	return db, nil
}
