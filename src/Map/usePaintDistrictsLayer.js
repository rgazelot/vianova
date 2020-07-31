import { useEffect } from 'react'

export function usePaintDistrictsLayer (map, showDistricts) {
  useEffect(() => {
    if (!map) {
      return
    }

    const paintDistricts = () => {
      map.setPaintProperty('community-districts', "fill-opacity", showDistricts ? 0.4 : 0)
    }

    // If this is the init of the map, paint when the map is ready,
    // if not, paint directly.
    if (!map.isStyleLoaded()) {
      map.on('style.load', paintDistricts)
    } else {
      paintDistricts()
    }
  }, [map, showDistricts])
}
