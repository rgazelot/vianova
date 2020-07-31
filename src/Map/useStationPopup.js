import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from "mapbox-gl"
import Popup from './Popup'

// Add the popup feature on the clicked station.
export function useStationPopup (map) {
  useEffect(() => {
    if (!map) {
      return
    }

    map.on('click', 'stations', e => {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['stations']
      })

      if (!features.length) {
        return
      }

      var feature = features[0]

      const popupContainer = document.createElement('div')
      ReactDOM.render(
        <Popup
          feature={feature}
          state={map.getFeatureState(feature)}
        />,
        popupContainer
      )

      new mapboxgl.Popup({
        offset: [0, -10],
        maxWidth: '170px',
        closeButton: false
      })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContainer.innerHTML)
        .addTo(map)

      map.on('mouseenter', 'stations', function() {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'stations', function() {
        map.getCanvas().style.cursor = ''
      })
    })
  }, [map])
}
