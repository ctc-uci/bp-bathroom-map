import React from 'react';
// import { compose, withProps, lifecycle } from 'recompose';
import {
  GoogleMap,
  // withGoogleMap,
  useLoadScript,
  Marker,
  // InfoWindow,
  DirectionsRenderer,

} from "@react-google-maps/api"
import { useState, useEffect } from 'react'
import Axios from "axios"
import {BrowserView, MobileView} from 'react-device-detect';

import './App.css';
import ClosestBathroomButton from './components/ClosestBathroomButton';
import RestroomMarker from './components/RestroomMarker';
import anteaterMarker from './assets/anteater_marker.png';
import findClosestMarker from './functions/findClosestMarker';
import HideBuildingsButton from './components/HideBuildingsButton';
import HideBathroomsButton from './components/HideBathrooms';
import ModalSheet from './components/ModalSheet';
import Pointer from './assets/Pointer.png';

import ctcLogo from './assets/ctc-logo 2.png'
import map from './assets/MAP.png'
//import hideBuildingNames from "./functions/hideBuildingNames";


/*

right now, the application starts at the user's location.
however, it's kind of inaccurate right now so we can't really
rely on it to give walking directions yet.

*/

function App() {
  // load markers from backend
  var DirectionsService;
  const [lat, setLat] = useState(33.64592727868923);
  const [lng, setLng] = useState(-117.84273979898299);
  const [destination, setDestination] = useState(null);
  const [closestBathroom, setClosestBathroom] = useState(null);
  const [directions, setDirections] = useState(null);
  const [listOfBathrooms, setListOfBathrooms] = useState([]);
  const [savedListOfBathrooms, setSavedListOfBathrooms] = useState([]);
  const [bathroomsHidden, setBathroomsHidden] = useState(false);
  const [buildingsHidden, setBuildingsHidden] = useState(false);


  const [mapStyle, setMapStyle] = useState([
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
          {
              color: '#eeeeee',
          },
      ],
    },
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
  ]);

  const loadData = async () => {
    navigator.geolocation.watchPosition((position) => {
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
      //console.log(lat,lng)
    })
    Axios.get('http://localhost:3001/bathrooms').then((response) => {
      // console.log(response);
      setListOfBathrooms(response.data)
    })

    await Axios.get("http://localhost:3001/bathrooms").then(async (response) => {
      console.log(response);
      setListOfBathrooms(response.data)
    })

    console.log("hi");
    console.log(listOfBathrooms);
    return listOfBathrooms;
  }

  // start the application by centering the map on the user's location
  useEffect(loadData,[])


  const findDirections = () => {
    // console.log('clicked');
    let closest = findClosestMarker(lat, lng, listOfBathrooms);
    // console.log(closest);
    setClosestBathroom(closest);

    DirectionsService.route({
      origin: new window.google.maps.LatLng(lat, lng),
      destination: new window.google.maps.LatLng(closest.latitude, closest.longitude),
      travelMode: window.google.maps.TravelMode.WALKING,
    }, (result, status) => {
      // console.log(result);
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
        // get distance
        // get walking time
      } else {
        console.error(`error fetching directions ${result}`);
      }
    })
  }

  const findSpecificRestroom = (bathroomName) => {
    console.log("wtf");
    let lt = 0;
    let long = 0;

    for(let i = 0; i < listOfBathrooms.length; i++){
      if(listOfBathrooms[i].name == bathroomName){
        lt = listOfBathrooms[i].latitude;
        long = listOfBathrooms[i].longitude;
        break;
      }
    }
    DirectionsService.route({
      origin: new window.google.maps.LatLng(lat, lng),
      destination: new window.google.maps.LatLng(lt, long),
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
    width: '100vw',
    height: '90vh'
  }

  const mapContainerStyleDesktop = {
    width: "50vw",
    height: "100vh"
  }

  // set dimensions of map

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : process.env.REACT_APP_MAPS_API_KEY,
  });

  if(loadError) return 'Error loading maps'

  if(!isLoaded) return 'Loading maps'

  DirectionsService = new window.google.maps.DirectionsService();

/*
this function hides the building names by editing the configuration of our map.
if the names are already hidden, we'll show them. otherwise, we'll hide them.


*/

  const hideBuildingNames = () => {
    // console.log('hi')
    if(buildingsHidden == true){
      setMapStyle ([
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'on',
                },
            ],
        },

    ])
    setBuildingsHidden(false)

    }
    else if(buildingsHidden == false){
      setMapStyle ([
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
    ])
    setBuildingsHidden(true)
    }
  }

  /*
  this function hides the bathroom markers in the same manner that we hid the building names
  in the previous function. To hide them, we set the list of bathrooms to only the closest bathrooms. we had
  to store this in a temporary variables so that we don't have to communicate to the backend again.
  */
  const hideBathrooms = () => {
    // let closest = findClosestMarker(lat, lng, listOfBathrooms)
    let closest = closestBathroom ? [closestBathroom] : []
    if(bathroomsHidden == true){
      setListOfBathrooms(savedListOfBathrooms)
      setSavedListOfBathrooms(closest)
      setBathroomsHidden(false)
    }
    else{
      setSavedListOfBathrooms(listOfBathrooms)
      setListOfBathrooms(closest)
      setBathroomsHidden(true)
    }
  }


/*

  kind of a lot to unpack here, but the <GoogleMap> tag renders
  the map that we created with the specifications we added.
  i recommend taking a look at the map function in react as well, as
  it's useful for saving space.

  */

  return (
    <div>
    <MobileView>
      <div class="App">
          <GoogleMap className="mapContainer" mapContainerStyle={mapContainerStyle} style={{width: "100vw", height: "90vh"}} zoom = {16} center = {{lat:lat, lng:lng}} options={{
                styles: mapStyle,
                streetViewControl: false,
            }}>
            {listOfBathrooms.map((item)=>(
              <RestroomMarker
                key={item._id}
                position={{lat:item.latitude, lng:item.longitude}}
                data={item}
                getDirections={findDirections}
                getSpecificDirections={(bathroomName) => findSpecificRestroom(bathroomName)}
              />
            ))}
            {
              lat && lng &&
              <Marker icon={Pointer}position={{lat: lat, lng: lng}} />
            }

            <DirectionsRenderer directions={directions}/>
          </GoogleMap>
          <div className='searchAndButton'>
            <ModalSheet />
            <ClosestBathroomButton clickHandler={findDirections}></ClosestBathroomButton>
          </div>
          <HideBuildingsButton clickHandler={hideBuildingNames} hidden={buildingsHidden}></HideBuildingsButton>
          <HideBathroomsButton clickHandler={hideBathrooms} hidden={bathroomsHidden}></HideBathroomsButton>
      </div>
    </MobileView>
    <BrowserView>
      <div class="AppDesktop">
        <div className='desktopMessage'>
          <div className='bathroomMapLogo'>
            <img src={ctcLogo} className='logo'></img>
            <div className='logoText'>
              UCI Bathroom Map
            </div>
          </div>
          <div className='userMsgContainer'>
            <div className='userMsg'>
              Hello &#128075;,
              <br></br>
              Please use your mobile device to use the service
            </div>
          </div>
        </div>
        <GoogleMap className="mapContainer" mapContainerStyle={mapContainerStyleDesktop} style={{width: "100vw", height: "100vh"}} zoom = {16} center = {{lat:lat, lng:lng}} options={{
                    styles: mapStyle,
                    streetViewControl: false,
                }}>
                {listOfBathrooms.map((item)=>(
                  <RestroomMarker
                    key={item._id}
                    position={{lat:item.latitude, lng:item.longitude}}
                    data={item}
                    // getDirections={findDirections}
                    // getSpecificDirections={(bathroomName) => findSpecificRestroom(bathroomName)}
                  />
                ))}
                {
                  lat && lng &&
                  <Marker position={{lat: lat, lng: lng}} />
                }

                <DirectionsRenderer directions={directions}/>
              </GoogleMap>
          </div>
      </BrowserView>
    </div>
  );
  }

export default App;
