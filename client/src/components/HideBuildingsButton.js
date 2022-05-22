import React from 'react'
import './hideBuildingsButton.css'
import buildingIcon from '../assets/building_icon.svg';

const HideBuildingsButton = (props) => {
  return (
    <button className="hide-buildings-button hide-buildings-button-text" onClick={props.clickHandler} >
      {
        props.hidden ?
        <img src={buildingIcon} className="building-icon"/>
        :
        <i className="bi bi-building building-icon blue-icon"></i>
        // <img src={buildingIcon} className="building-icon blue-icon"/>
      }
    </button>
  )
}

export default HideBuildingsButton
