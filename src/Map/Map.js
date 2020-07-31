import React, { useState } from 'react'
import RealTimeMap from './RealTimeMap'
import Sidebar from './Sidebar/Sidebar'
import { useSubscribeBikeStations } from './useSubscribeBikeStations'

export const FEATURE_BIKES_AVAILABLE = 'bikes_available'
export const FEATURE_STATIONS_STATUS = 'stations_status'
export const FEATURE_DOCKS_AVAILABLE = 'docks_available'

// Represents the entire map application
const Map = () => {
  // We can switch between features to display on the map
  const [feature, setFeature] = useState(FEATURE_BIKES_AVAILABLE)
  const [showDistricts, setShowDistricts] = useState(true)
  const [showStations, setShowStations] = useState(true)

  // Subscribe to bike stations updates using polling
  const bikeStationsData = useSubscribeBikeStations()

  return <div className='h-full relative text-blue-500 text-sm'>
    <Sidebar
      feature={feature}
      updateFeature={feature => setFeature(feature)}
      showDistricts={showDistricts}
      onToggleDistricts={() => setShowDistricts(!showDistricts)}
      showStations={showStations}
      onToggleStations={() => setShowStations(!showStations)}
    />
    <RealTimeMap
      feature={feature}
      bikeStationsData={bikeStationsData}
      showDistricts={showDistricts}
      showStations={showStations}
    />
  </div>
}

Map.propTypes = {

}

export default Map
