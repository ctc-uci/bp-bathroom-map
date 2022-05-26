import React, { useState, useEffect } from 'react'
import {
  Marker,
  InfoWindow,
} from "@react-google-maps/api"

import CardSheet from './Cardsheet';

const RestroomMarker = (props) => {
  // console.log(props)
  const [showRestroomCard, setShowRestroomCard] = useState(false);

  const toggleShowInfo = () => {
    // console.log('clicked');
    if (showRestroomCard === false) {
      setShowRestroomCard(true);
    } else {
      setShowRestroomCard(false);
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

        showRestroomCard &&
        <CardSheet
          data={props.data}
          reload={props.reload}
          getDirections={() => {
            props.getDirections();
            setShowRestroomCard(false);
          }}
          getSpecificDirections={(bathroomName) => props.getSpecificDirections(bathroomName)}
          showRestroomCard={showRestroomCard}
          setShowRestroomCard={setShowRestroomCard}
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
