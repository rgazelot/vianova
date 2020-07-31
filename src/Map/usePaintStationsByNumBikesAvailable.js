import { useEffect } from 'react'
import { FEATURE_BIKES_AVAILABLE } from './Map'

// If the feature is active, paint the stations by bikes available.
export function usePaintStationsByNumBikesAvailable (map, feature) {
  useEffect(() => {
    if (!map || feature !== FEATURE_BIKES_AVAILABLE) {
      return
    }

    const paint = () => {
      map.setPaintProperty('stations', "circle-color", [
        "case",
        ["!=", ["feature-state", "num_bikes_available"], null],
        // if we have turnout information for a feature, use it to interpolate a color
        [
          "step",
          // use the value of the `num_bikes_available` feature-state as an input
          ["feature-state", "num_bikes_available"],
          "rgba(255, 0, 0, 1)",
          1,
          "rgba(221, 129, 8, 1)",
          6,
          "rgba(58, 221, 8, 1)"
        ],
        // if there is no turnout information, use gray
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
