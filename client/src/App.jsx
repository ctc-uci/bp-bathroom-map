/*global google*/

import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  GoogleMap,
  withGoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api"
import { useState, useEffect } from 'react'
import axios from "axios"

import './App.css';
import ClosestBathroomButton from './components/ClosestBathroomButton';
import restrooms from "./assets/restrooms.json";
import RestroomMarker from './components/RestroomMarker';
import anteaterMarker from './assets/anteater_marker.png';
import findClosestMarker from './functions/findClosestMarker';

/*

right now, the application starts at the user's location.
however, it's kind of inaccurate right now so we can't really
rely on it to give walking directions yet.

*/

function App() {
  // load markers from backend
  var DirectionsService;
  const [lat, setLat] = useState(33.64592727868923)
  const [lng, setLng] = useState(-117.84273979898299)
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);

  // start the application by centering the map on the user's location
  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
      console.log(lat,lng)
    })
  })

  // on first render,
  useEffect(() => {
    DirectionsService = new window.google.maps.DirectionsService();
  }, [])

  const findDirections = () => {
    console.log('clicked');
    let closest = findClosestMarker(lat, lng, restrooms.restrooms);
    console.log(closest);

    DirectionsService.route({
      origin: new window.google.maps.LatLng(lat, lng),
      destination: new window.google.maps.LatLng(closest.latitude, closest.longitude),
      travelMode: window.google.maps.TravelMode.WALKING,
    }, (result, status) => {
      console.log(result);
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
        // get distance
        // get walking time
      } else {
        console.error(`error fetching directions ${result}`);
      }
    })
  }


  const mapContainerStyle = {
    width: "100vw",
    height: "90vh"
  }

  // set dimensions of map

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
      <GoogleMap className="mapContainer" mapContainerStyle={mapContainerStyle} style={{width: "100vw", height: "90vh"}} zoom = {16} center = {{lat:lat, lng:lng}}>
        {restrooms.restrooms.map((item)=>(
          <RestroomMarker
            key={item.id}
            position={{lat:item.latitude, lng:item.longitude}}
            data={item}
          />
        ))}
        {
          lat && lng &&
          <Marker position={{lat: lat, lng: lng}} icon={anteaterMarker}/>
        }

        <DirectionsRenderer directions={directions}/>
      </GoogleMap>
      <ClosestBathroomButton clickHandler={findDirections}></ClosestBathroomButton>
    </div>
  );
}

export default App;
