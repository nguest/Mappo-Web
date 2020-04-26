package location

import (
	"fmt"
	"testing"

	"github.com/nguest/mappo-web/models"
)

func TestGetTrackLocation(t *testing.T) {
	item := models.Item{
		Filepath: "31c53cee-3daa-4f49-9131-a86172931ceb.igc",
	}
	t.Run("a known location", testFuncGetTrackLocation(item, "Chapareillan, Isère, France"))

}

func testFuncGetTrackLocation(item models.Item, want string) func(*testing.T) {
	return func(t *testing.T) {
		got := GetTrackLocation(item)
		if got != want {
			fmt.Printf("WANT: %+v\n GOT: %+v\n", want, got)
			t.FailNow()
		}
	}
}
