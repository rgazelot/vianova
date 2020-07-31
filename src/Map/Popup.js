import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  Build as BuildIcon,
} from '@material-ui/icons'

// The station's popup
const Popup = ({ feature, state }) => {
  const { t } = useTranslation('map')

  return <div className='flex flex-col items-center'>
    <div className='px-4 text-lg mb-3'>
      {feature.properties.name}
    </div>
    <div className='flex w-full'>
      {feature.state.station_status === 'out_of_service' &&
        <div className='flex flex-col flex-grow items-center'>
          <BuildIcon fontSize='large' />
          <div>{t('Out of service')}</div>
        </div>
      }
      {feature.state.station_status === 'active' &&
        <React.Fragment>
          <div className='flex flex-col flex-grow items-center'>
            <div className='text-4xl mb-2'>{state.num_bikes_available}</div>
            <div>{t('Bikes')}</div>
          </div>
          <div className='flex flex-col flex-grow items-center'>
            <div className='text-4xl mb-2'>{state.num_docks_available}</div>
            <div>{t('Free docks')}</div>
          </div>
        </React.Fragment>
      }
    </div>
  </div>
}

Popup.propTypes = {
  feature: PropTypes.object.isRequired,
  state: PropTypes.object
}

export default Popup
