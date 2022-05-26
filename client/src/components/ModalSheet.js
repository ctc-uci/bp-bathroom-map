import React, { useState, useEffect } from 'react';
import './ModalSheet.css';
import Sheet from 'react-modal-sheet';
import Axios from 'axios';
import Fuse from 'fuse.js';
import SearchCard from './SearchCard.js';

import search_icon from '../assets/search_icon.png';
import CardSheet from './Cardsheet.js';

const rad = (x) => {
  return x * Math.PI / 180;
}

const R = 6371; // radius of earth in km

const ModalSheet = ({ lat, lng, reload, getSpecificDirections }) => {

  const [isOpen, setOpen] = useState(false);

  const options= { distance:20, findAllMatches:true, limit:10 };
  const [fuse, setFuse] = useState();
  const [bathroomResults, setBathroomResults] = useState([]);
  const [bathroomsJSON, setBathroomsJSON] = useState({});


  const [showRestroomCard, setShowRestroomCard] = useState(false);
  const [cardData, setCardData] = useState({});

  const getBathroomNames = async () => {
    const res = await Axios.get("http://localhost:3001/bathrooms");
    setBathroomsJSON(res.data);
    setFuse(new Fuse(res.data.map((bathroom) => bathroom.name),options));
  }

  useEffect(async () => {
    await getBathroomNames();
  }, [])

  const calcDist = (location) => {
    const mlat = location.latitude;
    const mlng = location.longitude;
    const dLat = rad(mlat - lat);
    const dLong = rad(mlng - lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  }

  const calcRating = (reviews) => {
    const length = reviews?.length;
    if (!length) {
      return NaN;
    }
    return (reviews.reduce((a,b) => (a.reviews + b)) / length).toFixed(1);
  }

  const calcSearchWeight = (aIdx, bIdx) => {
    const a = bathroomsJSON[aIdx];
    const b = bathroomsJSON[bIdx];
    return calcDist(a) - calcDist(b) + calcRating(a.reviews) - calcRating(b.reviews);
  }

  const changeHandler = (e) => {
    const val = e.target.value;
    event.preventDefault(); //prevent default behavior
    let similarBathrooms= fuse.search(val);
    similarBathrooms.sort((a,b) => calcSearchWeight(a.refIndex,b.refIndex));
    setBathroomResults(similarBathrooms);
  }

  const createCard = (idx) => {
    const bathroom = bathroomsJSON[idx]
    const avg_rating = calcRating(bathroom?.reviews);
    // console.log(avg_rating);

    const onSearchResultClick = () => {
      setOpen(false);
      console.log(bathroom.name);
      // showInfos[bathroom._id](true);
      setCardData(bathroom);
      setShowRestroomCard(true);
    }

    return (
      <div onClick={onSearchResultClick}>
        <SearchCard
          key={bathroom._id}
          name={bathroom.name}
          rating = {avg_rating}
          img={bathroom.img}
          hours={bathroom.hours}
        />
      </div>
    )
  }

  return (
    <div className='search'>
      <div className="search-wrapper">
        <img src={search_icon} className='search-image' />
        <input
          className="search-bar-btn"
          onClick={() => setOpen(true)}
          placeholder="Search Bathrooms"
        />
      </div>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="modal-body">
              <div className="search-header">
                <div className="search-wrapper">
                  <i className="bi bi-search search-icon" />
                  <input
                    className="search-bar-btn"
                    placeholder="Search Bathrooms"
                    onChange={changeHandler}
                    autoFocus
                  />
                </div>

                <div className="button-wrapper">
                  <button className="cancel-button" onClick={() => setOpen(false)}>Cancel</button>
                </div>
              </div>

              <div>
                {
                  bathroomResults.map((idx) => createCard(idx.refIndex))
                }
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      {
        showRestroomCard &&
        <CardSheet
          data={cardData} // change based on card
          reload={reload}
          getSpecificDirections={(bathroomName) => getSpecificDirections(bathroomName)}
          showRestroomCard={showRestroomCard}
          setShowRestroomCard={setShowRestroomCard}
        />
      }
    </div>
  );
}

export default ModalSheet;
