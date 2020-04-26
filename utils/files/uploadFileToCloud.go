package files

import (
	"context"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"path"

	"cloud.google.com/go/storage"

	uuid "github.com/gofrs/uuid"
)

// UploadFileToCloud uploads a file to preset bucket.
func UploadFileToCloud(file multipart.File, header *multipart.FileHeader) (url string, err error) {
	ctx := context.Background()

	client, err := storage.NewClient(ctx)
	if err != nil {
		fmt.Println("ERROR2", err)
	}
	bucket := client.Bucket("gpstracks")
	fmt.Println("hello1")
	fmt.Println("Buckets:")

	if bucket == nil {
		return "", errors.New("storage bucket is missing")
	}
	// random filename, retaining existing extension.
	name := uuid.Must(uuid.NewV4()).String() + path.Ext(header.Filename)

	ctx = context.Background()
	w := bucket.Object(name).NewWriter(ctx)
	fmt.Println("name", name)
	w.ACL = []storage.ACLRule{{Entity: storage.AllUsers, Role: storage.RoleReader}}
	w.CacheControl = "public, max-age=86400"

	if _, err := io.Copy(w, file); err != nil {
		fmt.Println("COPY", file)
		return "", err
	}
	if err := w.Close(); err != nil {
		fmt.Println("CLOSEEROR", err)
		return name, err
	}

	const publicURL = "https://storage.googleapis.com/%s/%s"
	fmt.Println("publicURL", publicURL)
	return name, nil
}
