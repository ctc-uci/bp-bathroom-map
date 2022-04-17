import React, { useState, useEffect } from 'react';
import './ModalSheet.css';
import Sheet from 'react-modal-sheet';
import Axios from 'axios';
import Fuse from 'fuse.js';
import SearchCard from './SearchCard.js';

const ModalSheet = () => {
  const [isOpen, setOpen] = useState(false);

  const options= { distance:20, findAllMatches:true, limit:10 };
  const [fuse, setFuse] = useState();
  const [bathroomResults, setBathroomResults]=useState([]);
  const [bathroomsList, setBathroomsList] = useState([]);
  const [bathroomsJSON, setBathroomsJSON] = useState({});

  const getBathroomNames = async () => {
    const res = await Axios.get("http://localhost:3001/bathrooms");
    const bathroomNames = res.data.map((bathroom) => bathroom.name);
    setBathroomsList(bathroomNames);
    setBathroomsJSON(res.data);
    setFuse(new Fuse(bathroomNames,options));
  }

  useEffect(async () => {
    await getBathroomNames();
  }, [])
  
  const changeHandler = (e) => {
    const val = e.target.value;
    event.preventDefault(); //prevent default behavior
    const similarBathrooms= fuse.search(val);
    setBathroomResults(similarBathrooms);
  }

  const createCard = (idx) => {
    const bathroom = bathroomsJSON.filter((data) => data.name===bathroomsList[idx])[0]
    
    const reducer = (acc, curr) => acc + curr;
    const length = bathroom.reviews.length;
    const reviews = bathroom.reviews.map((e) => e.rating);
    const avg_rating = (length===0 ? NaN : reviews.reduce(reducer) / length).toFixed(1);
    
    return (
      <SearchCard
        key={bathroom._id}
        name={bathroom.name}
        location={bathroom.longitude.toFixed(3) + ', ' + bathroom.latitude.toFixed(3)}
        rating = {avg_rating}
        img={bathroom.img}
      />
    )
  }

  return (
    <div>
      <div className="search-wrapper">
        <i className="bi bi-search search-icon"></i>
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
                  bathroomResults.map((idx) => createCard(idx))
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
