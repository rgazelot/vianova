import { useEffect } from 'react'
import { FEATURE_DOCKS_AVAILABLE } from './Map'

// If the feature is active, paint the stations by docks available.
export function usePaintDocksAvaialable (map, feature) {
  useEffect(() => {
    if (!map || feature !== FEATURE_DOCKS_AVAILABLE) {
      return
    }

    const paint = () => {
      map.setPaintProperty('stations', "circle-color", [
        "case",
        ["!=", ["feature-state", "num_docks_available"], null],
        [
          "step",
          ["feature-state", "num_docks_available"],
          "rgba(255, 0, 0, 1)",
          1,
          "rgba(221, 129, 8, 1)",
          6,
          "rgba(58, 221, 8, 1)"
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
