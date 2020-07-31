import React from 'react'
import { useTranslation } from 'react-i18next'

const Loader = () => {
  const { t } = useTranslation()

  return <div className='flex w-full h-screen bg-blue-200 text-white items-center align-center'>
    <div className='text-2xl w-full text-center'>{t('Loading')}...</div>
  </div>
}

Loader.propTypes = {

}

export default Loader
