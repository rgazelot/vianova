import { useEffect } from 'react'

export function usePaintStationsLayer (map, showStations) {
  useEffect(() => {
    if (!map) {
      return
    }

    const paintStations = () => {
      map.setPaintProperty('stations', "circle-opacity", showStations ? 1 : 0)
    }

    // If this is the init of the map, paint when the map is ready,
    // if not, paint directly.
    if (!map.isStyleLoaded()) {
      map.on('style.load', paintStations)
    } else {
      paintStations()
    }
  }, [map, showStations])
}
