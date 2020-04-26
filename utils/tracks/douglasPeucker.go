package tracks

import (
	"math"
)

type Line struct {
	V1 Datum
	V2 Datum
}

// Diff calculates the difference betweenn v1 and v2
func Diff(v1 Datum, v2 Datum) Datum {
	var vR Datum
	vR.Lon = v2.Lon - v1.Lon
	vR.Lat = v2.Lat - v1.Lat
	return vR
}

func abs(v1 Datum, v2 Datum) float64 {
	return math.Sqrt(math.Pow(Diff(v1, v2).Lon, 2) + math.Pow(Diff(v1, v2).Lat, 2))
}

// PerpendicularDistance calculates the perpendicular distance between v and line
func PerpendicularDistance(v Datum, line Line) float64 {
	if v == line.V1 || v == line.V2 || line.V1 == line.V2 {
		return 0.0
	}
	alpha := math.Atan((Diff(line.V1, v).Lat / (Diff(line.V2, v).Lon)))
	lambda := math.Atan((Diff(v, line.V1).Lat / (Diff(v, line.V1).Lon)))
	theta := alpha - lambda
	return math.Abs(math.Sin(theta) * abs(v, line.V1))
}

/*
export const diff = (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y });
export const abs = (v1, v2) => (diff(v1, v2).x ** 2 + diff(v1, v2).y ** 2) ** 0.5;

export const perpendicularDistance = (pi, line) => {
  const [p1, pEnd] = line
  const alpha = Math.atan((diff(pEnd, p1).y / (diff(pEnd, p1).x)));
  const lambda = Math.atan((diff(pi, p1).y / (diff(pi, p1).x)));
  const theta = alpha - lambda;
  return Math.sin(theta) * abs(pi, p1);
};*/

// DouglasPeucker calculates a simplified set of Datums with paramater e
func DouglasPeucker(data []Datum, e float64) []Datum {
	// Find the point with the maximum distance
	dMax := 0.0
	idx := 0
	end := len(data)

	for i := 2; i <= end-1; i++ {
		line := Line{
			V1: data[1],
			V2: data[end],
		}
		d := PerpendicularDistance(data[i], line)
		if d > dMax {
			idx = i
			dMax = d
		}
	}

	var Res []Datum
	if dMax > e {
		// Recursive call
		recR1 := DouglasPeucker(data[1:idx], e)
		recR2 := DouglasPeucker(data[idx:end], e)
		// Build the result list
		Res = append(recR1[1:len(recR1)-1], recR2[1:len(recR2)]...)
	} else {
		Res = []Datum{data[1], data[end]}
	}
	return Res

}
