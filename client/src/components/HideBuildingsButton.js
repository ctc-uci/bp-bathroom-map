import React from 'react'
import './hideBuildingsButton.css'

const HideBuildingsButton = (props) => {
  return (
    <button class="hide-buildings-button hide-buildings-button-text" onClick={props.clickHandler} >Hide Buildings</button>
  )
}

export default HideBuildingsButton
