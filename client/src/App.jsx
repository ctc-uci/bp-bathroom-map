import React from 'react';
import './App.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api"
import ClosestBathroomButton from './components/ClosestBathroomButton';
import { useState, useEffect } from 'react'
import restrooms from "./assets/restrooms.json"
import axios from "axios"

/*

right now, the application starts at the user's location.
however, it's kind of inaccurate right now so we can't really
rely on it to give walking directions yet.

*/


function App() {
  // start the application by centering the map on the user's location
  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
      console.log(lat,lng)
    })
  })

  // load markers from backend
  const [lat, setLat] = useState(33.64592727868923)
  const [lng, setLng] = useState(-117.84273979898299)

  // set dimensions of map
  const mapContainerStyle = {
    width: "100vw",
    height: "90vh"
  }

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : process.env.REACT_APP_MAPS_API_KEY,
  });

  if(loadError) return "Error loading maps"

  if(!isLoaded) return "Loading maps"

  /*

  kind of a lot to unpack here, but the <GoogleMap> tag renders
  the map that we created with the specifications we added.
  i recommend taking a look at the map function in react as well, as
  it's useful for saving space.

  */

  return (
    <div class="App">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom = {16} center = {{lat:lat, lng:lng}}>
        {restrooms.restrooms.map((item)=>(
          <Marker
            key={item.id}
            position={{lat:item.latitude, lng:item.longitude}}
          />
        ))}
      </GoogleMap>
      <ClosestBathroomButton></ClosestBathroomButton>
    </div>
  );
}

export default App;
