import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Map from './Map/Map'
import i18n from 'core/i18next'
import Loader from './Loader'
import './App.css'

const App = () => {
  const [loadingTranslation, setLoadingTranslation] = useState(true)

  useEffect(
    function loadTranslations () {
      // Configure i18next
      i18n.init({
        detection: {
          order: ['path', 'localStorage']
        },
        fallbackLng: 'en',
        ns: ['map', 'page'],
        debug: false,
        supportedLngs: ['en', 'fr'],
        whitelist: ['en', 'fr'],
        checkWhitelist: true,
        preload: ['en', 'fr'],
        react: {
          useSuspense: false
        }
      }).then(() => setLoadingTranslation(false))
    }
  , [])

  if (loadingTranslation || !i18n.isInitialized) {
    return <Loader />
  }

  return <div className='bg-gray-200 w-full h-screen'>
    <Router>
      <Switch>
        <Route exact path={`/:lang/${i18n.t('page:map')}`} component={Map} />
        <Route path="*">
          <Redirect to={`/${i18n.language}/${i18n.t('page:map')}`} />
        </Route>
      </Switch>
    </Router>
  </div>
}

export default App;
