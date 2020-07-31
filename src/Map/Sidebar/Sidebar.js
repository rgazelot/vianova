import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  DirectionsBike as DirectionsBikeIcon,
  Room as RoomIcon,
  LocalParking as LocalParkingIcon,
  Layers as LayersIcon,
  LayersClear as LayersClearIcon,
} from '@material-ui/icons'
import MenuPart from './MenuPart'
import MenuElement from './MenuElement'
import {
  FEATURE_BIKES_AVAILABLE,
  FEATURE_STATIONS_STATUS,
  FEATURE_DOCKS_AVAILABLE
} from '../Map'

// Simple sidebar to switch between features.
const Sidebar = ({
  feature,
  updateFeature,
  showDistricts,
  onToggleDistricts,
  showStations,
  onToggleStations
}) => {
  const { t } = useTranslation('map')

  return <div
    className='absolute bg-gray-100 z-10 rounded py-2 px-3'
    style={{ top: '10px', left: '10px' }}
  >
    <MenuPart text={t('Users')}>
      <MenuElement
        icon={<DirectionsBikeIcon fontSize='small' />}
        text={t('Bikes available')}
        active={feature === FEATURE_BIKES_AVAILABLE}
        onClick={() => updateFeature(FEATURE_BIKES_AVAILABLE)}
      />
      <MenuElement
        icon={<LocalParkingIcon fontSize='small' />}
        text={t('Docks available')}
        active={feature === FEATURE_DOCKS_AVAILABLE}
        onClick={() => updateFeature(FEATURE_DOCKS_AVAILABLE)}
      />
    </MenuPart>
    <MenuPart text={t('Maintainance')}>
      <MenuElement
        icon={<RoomIcon fontSize='small' />}
        text={t('Stations available')}
        active={feature === FEATURE_STATIONS_STATUS}
        onClick={() => updateFeature(FEATURE_STATIONS_STATUS)}
      />
    </MenuPart>
    <MenuPart text={t('Layers')}>
      <MenuElement
        icon={showDistricts ? <LayersIcon fontSize='small' /> : <LayersClearIcon fontSize='small' />}
        text={t('Community districts')}
        active={showDistricts}
        onClick={() => onToggleDistricts()}
      />
      <MenuElement
        icon={showStations ? <LayersIcon fontSize='small' /> : <LayersClearIcon fontSize='small' />}
        text={t('Stations')}
        active={showStations}
        onClick={() => onToggleStations()}
      />
    </MenuPart>
  </div>
}

Sidebar.propTypes = {
  feature: PropTypes.string.isRequired,
  updateFeature: PropTypes.func.isRequired,
  showDistricts: PropTypes.bool.isRequired,
  onToggleDistricts: PropTypes.func.isRequired,
  showStations: PropTypes.bool.isRequired,
  onToggleStations: PropTypes.func.isRequired
}

export default Sidebar
