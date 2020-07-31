import React from 'react'
import PropTypes from 'prop-types'

// Part of the Sidebar menu
const MenuPart = ({ children, text }) => {
  return <div className='mb-2'>
    <div>{text}</div>
    <hr className='mb-2'/>
    {children}
  </div>
}

MenuPart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  text: PropTypes.string.isRequired
}

export default MenuPart
