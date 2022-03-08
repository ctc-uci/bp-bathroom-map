import React from 'react'
import './hideBathrooms.css'

const HideBathroomsButton = (props) => {
  return (
    <button class="hide-bathrooms-button hide-bathrooms-button-text" onClick={props.clickHandler} >Hide Bathrooms</button>
  )
}

export default HideBathroomsButton
