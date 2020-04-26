package tracks

import (
	"fmt"
	"testing"
)

func TestGetBoundingBox(t *testing.T) {
	data := []Datum{
		Datum{
			Lat: 21.0,
			Lon: 10.0,
		},
		Datum{
			Lat: 18.0,
			Lon: 12.0,
		},
		Datum{
			Lat: 22.0,
			Lon: 11.0,
		},
	}
	got := GetBoundingBox(data)
	want := BoundingBox{
		SW: Datum{
			Lat: 22.0,
			Lon: 12.0,
		},
		NE: Datum{
			Lat: 18.0,
			Lon: 10.0,
		},
	}
	if got != want {
		fmt.Printf("WANT: %+v\n GOT: %+v\n", want, got)
		t.FailNow()
	}
}
