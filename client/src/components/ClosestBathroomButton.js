import React from 'react'
import './closestBathroomButton.css'

const ClosestBathroomButton = (props) => {
  return (
    <button className="bathroom-button bathroom-button-text" onClick={props.clickHandler}>Find Closest Restroom</button>
  )
}

export default ClosestBathroomButton
