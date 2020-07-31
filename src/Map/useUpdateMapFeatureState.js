import { useEffect } from 'react'

// When bike stations data change, update the feature-state of features fo the
// stations layer.
export function useUpdateMapFeatureState (map, data) {
  useEffect(() => {
    if (!map || !data) {
      return
    }

    const updateMapFeatureState = () => {
      data.forEach(station => {
        const { num_bikes_available, station_status, num_docks_available } = station

        map.setFeatureState(
          { source: "composite", sourceLayer: 'stations', id: parseInt(station.station_id) },
          { num_bikes_available, station_status, num_docks_available }
        )
      })
    }

    if (!map.isStyleLoaded()) {
      map.on('style.load', updateMapFeatureState)
    } else {
      updateMapFeatureState()
    }
  }, [map, data])
}
