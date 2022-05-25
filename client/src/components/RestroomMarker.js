import React, { useState, useEffect } from 'react'
import {
  Marker,
  InfoWindow,
} from "@react-google-maps/api"

import CardSheet from './Cardsheet';

const RestroomMarker = (props) => {
  // console.log(props)
  const [showInfo, setShowInfo] = useState(false);

  // props.myRef.current.setShowInfo = setShowInfo;

  const toggleShowInfo = () => {
    // console.log('clicked');
    if (showInfo === false) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
    // setShowInfo(!showInfo);
  }

  return (
    <div>

      <Marker
            // key={props.key}
            position={props.position}
            onClick={toggleShowInfo}
          />

      {

        showInfo &&
        <CardSheet
          data={props.data}
          reload={props.reload}
          getDirections={() => {
            props.getDirections();
            setShowInfo(false);
          }}
          getSpecificDirections={(bathroomName) => props.getSpecificDirections(bathroomName)}
        />

      //   showInfo && <InfoWindow position={{lat: props.position.lat + 0.0002, lng: props.position.lng}} onCloseClick={toggleShowInfo}>
      //     <CardSheet data={props.data} ></CardSheet>
      //     {/* <div className="marker-info">
      //       <p>{props.data.name}</p>
      //     </div> */}

      // </InfoWindow>
      }

    </div>
  )
}

export default RestroomMarker;
