import React from 'react'
import PropTypes from 'prop-types'

// A simple feature element into the Sidebar
const MenuElement = ({ icon, text, active, onClick }) => {
  return <div
    className='text-xs flex items-center mb-2 cursor-pointer'
    onClick={onClick}
  >
    <div className='mr-2'>
      {icon}
    </div>
    <span className={`${active ? 'text-blue-800': ''}`}>{text}</span>
  </div>
}

MenuElement.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MenuElement
