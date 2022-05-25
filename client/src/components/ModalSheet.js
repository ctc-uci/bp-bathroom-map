import React, { useState, useEffect } from 'react';
import './ModalSheet.css';
import Sheet from 'react-modal-sheet';
import Axios from 'axios';
import Fuse from 'fuse.js';
import SearchCard from './SearchCard.js';
import search_icon from '../assets/search_icon.png';

const rad = (x) => {
  return x * Math.PI / 180;
}

const R = 6371; // radius of earth in km

const ModalSheet = ({ lat, lng }) => {
  const [isOpen, setOpen] = useState(false);

  const options= { distance:20, findAllMatches:true, limit:10 };
  const [fuse, setFuse] = useState();
  const [bathroomResults, setBathroomResults] = useState([]);
  const [bathroomsJSON, setBathroomsJSON] = useState({});

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
    console.log(similarBathrooms.map((e) => bathroomsJSON[e.refIndex]));
    similarBathrooms.sort((a,b) => calcSearchWeight(a.refIndex,b.refIndex));
    setBathroomResults(similarBathrooms);
  }

  const createCard = (idx) => {
    const bathroom = bathroomsJSON[idx]
    const avg_rating = calcRating(bathroom?.reviews);
    console.log(avg_rating);

    return (
      <SearchCard
        key={bathroom._id}
        name={bathroom.name}
        rating = {avg_rating}
        img={bathroom.img}
      />
    )
  }

  return (
    <div className='search'>
      <div className="search-wrapper">
        {/* <i className="bi bi-search search-icon"></i> */}
        <img src={search_icon} className='search-image'></img>
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
                  <i className="bi bi-search search-icon"></i>
                  <input
                    className="search-bar-btn"
                    placeholder="Search Bathrooms"
                    onChange={changeHandler}
                    autoFocus
                  ></input>
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
    </div>
  );
}

export default ModalSheet;
