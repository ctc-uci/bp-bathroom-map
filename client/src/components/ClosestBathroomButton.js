import React from 'react'
import './closestBathroomButton.css'

const ClosestBathroomButton = (props) => {
  return (
    <button class="bathroom-button bathroom-button-text" onClick={props.clickHandler}>Find Closest Restroom</button>
  )
}

export default ClosestBathroomButton
