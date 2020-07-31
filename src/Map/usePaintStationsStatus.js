import { useEffect } from 'react'
import { FEATURE_STATIONS_STATUS } from './Map'

// If the feature is active, paint the stations by their status.
export function usePaintStationsStatus (map, feature) {
  useEffect(() => {
    if (!map || feature !== FEATURE_STATIONS_STATUS) {
      return
    }

    const paint = () => {
      map.setPaintProperty('stations', "circle-color", [
        "case",
        ["!=", ["feature-state", "station_status"], null],
        [
          "case",
          ["==", ["feature-state", "station_status"], 'active'],
          "rgba(58, 221, 8, 1)",
          "rgba(255, 0, 0, 1)"
        ],
        "rgba(127, 127, 127, 1)"
      ])
    }

    // If this is the init of the map, paint when the map is ready,
    // if not, paint directly.
    if (!map.isStyleLoaded()) {
      map.on('style.load', paint)
    } else {
      paint()
    }
  }, [map, feature])
}
