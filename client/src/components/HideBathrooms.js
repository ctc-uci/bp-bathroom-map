import React from 'react'
import './hideBathrooms.css'
import toiletIconBlue from '../assets/toilet_icon_blue.svg';
import toiletIconBlack from '../assets/toilet_icon_black.svg';

const HideBathroomsButton = (props) => {
  return (
    <button className="hide-bathrooms-button hide-bathrooms-button-text" onClick={props.clickHandler} >
      {
        props.hidden ?
        <img src={toiletIconBlack} className="toilet-icon"/>
        :
        <img src={toiletIconBlue} className="toilet-icon"/>
      }
    </button>
  )
}

export default HideBathroomsButton
