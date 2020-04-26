package tracks

// BoundingBox of northeast and southwest of trackData
type BoundingBox struct {
	NE Datum `json:"ne"`
	SW Datum `json:"sw"`
}

// GetBoundingBox returns the bounding box of the track
func GetBoundingBox(data []Datum) BoundingBox {
	LonMin := 360.0
	LatMin := 180.0
	LonMax := 0.0
	LatMax := 0.0
	// normalize data and check relative size
	for i := 0; i < len(data); i++ {
		if nLon(data[i].Lon) > LonMax {
			LonMax = nLon(data[i].Lon)
		}
		if nLon(data[i].Lon) < LonMin {
			LonMin = nLon(data[i].Lon)
		}
		if nLat(data[i].Lat) > LatMax {
			LatMax = nLat(data[i].Lat)
		}
		if nLat(data[i].Lat) < LatMin {
			LatMin = nLat(data[i].Lat)
		}
	}

	var ne = Datum{
		Lat: LatMin - 90,
		Lon: LonMin - 180,
	}

	var sw = Datum{
		Lat: LatMax - 90,
		Lon: LonMax - 180,
	}

	return BoundingBox{
		NE: ne,
		SW: sw,
	}
}

// normalize lon to 0 -> 360, lat to 0 -> 180
func nLon(in float64) float64 { return in + 180 }
func nLat(in float64) float64 { return in + 90 }
