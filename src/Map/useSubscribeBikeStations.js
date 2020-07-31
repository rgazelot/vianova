import { useState, useEffect } from 'react'
import axios from 'axios'
import URI from 'urijs'
import { useTranslation } from 'react-i18next'

// Use polling to subscribe to bike stations updates.
export function useSubscribeBikeStations () {
  const { i18n } = useTranslation()
  const [data, setData] = useState([])

  // Query public Citi Bike NYC data
  // @see https://gbfs.citibikenyc.com/gbfs/en/system_information.json
  const url = new URI('https://gbfs.citibikenyc.com/gbfs')
  url.segment(i18n.language)
  url.segment('station_status.json')

  const getBikeStationsData = () => {
    axios.get(url.toString(), {})
    .then(response => {
      // Store the stations data into local state
      setData(response.data.data.stations)
      // Set the next polling using the ttl
      setTimeout(getBikeStationsData, response.data.ttl * 1000)
    })
    .catch(error => console.log(error))
  }

  useEffect(
    function subscribeBikeStationsData() {
      getBikeStationsData()
    },
  // eslint-disable-next-line
  [])

  return data
}
