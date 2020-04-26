package files

import (
	"context"
	"fmt"
	"os"

	"cloud.google.com/go/storage"
)

// DeleteLocalFile deletes a local file with the given filepath
func DeleteLocalFile(filepath string) error {
	// delete file
	var err = os.Remove(filepath)
	if err != nil {
		fmt.Println("Could Not Delete File:", filepath)
		return err
	}
	fmt.Println("File Deleted:", filepath)
	return nil
}

// DeleteCloudFile deletes a cloud file with the given filepath
func DeleteCloudFile(filepath string) error {
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		// TODO: Handle error.
		fmt.Println("ERROR", err)
		return err
	}
	bucketName := "gpstracks"
	bucket := client.Bucket(bucketName)
	err = bucket.Object(filepath).Delete(ctx)
	if err != nil {
		fmt.Println("deleteFiles: unable to delete from bucket")
		return err
	}
	fmt.Println("deleteFiles success")
	return nil
}
