import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useMapbox } from "use-mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { MAPBOX_ACCESS_TOKEN } from 'core/config'
import { useTranslation } from 'react-i18next'
import { usePaintStationsByNumBikesAvailable } from './usePaintStationsByNumBikesAvailable'
import { usePaintStationsStatus } from './usePaintStationsStatus'
import { useUpdateMapFeatureState } from './useUpdateMapFeatureState'
import { usePaintDocksAvaialable } from './usePaintDocksAvaialable'
import { useStationPopup } from './useStationPopup'
import { usePaintDistrictsLayer } from './usePaintDistrictsLayer'
import { usePaintStationsLayer } from './usePaintStationsLayer'

// Realtime Mapbox map
const RealTimeMap = ({ bikeStationsData, feature, showDistricts, showStations }) => {
  const { i18n } = useTranslation()
  const mapContainer = useRef(null)

  // Use the current language to choose the style.
  const styles = {
    en: 'mapbox://styles/rgazelot/ckd6j6d6k00gs1iknpn22f0xr',
    fr: 'mapbox://styles/rgazelot/ckd73uwe40klm1ipf66h81l3a'
  }

  const map = useMapbox(mapContainer, MAPBOX_ACCESS_TOKEN, {
    style: styles[i18n.language],
    center: [-73.9824341846707, 40.717348146812384],
    zoom: 12.2
  })

  // All the map functionalities use hooks.
  useStationPopup(map)
  useUpdateMapFeatureState(map, bikeStationsData)
  usePaintStationsByNumBikesAvailable(map, feature)
  usePaintStationsStatus(map, feature)
  usePaintDocksAvaialable(map, feature)
  usePaintDistrictsLayer(map, showDistricts)
  usePaintStationsLayer(map, showStations)

  return <div className='w-full h-full' ref={mapContainer} />
}

RealTimeMap.propTypes = {
  feature: PropTypes.string.isRequired,
  bikeStationsData: PropTypes.array,
  showDistricts: PropTypes.bool.isRequired,
  showStations: PropTypes.bool.isRequired
}

export default RealTimeMap
