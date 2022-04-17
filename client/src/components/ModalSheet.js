import React, { useState, useEffect } from 'react';
import './ModalSheet.css';
import Sheet from 'react-modal-sheet';
import Axios from 'axios';
import Fuse from 'fuse.js';

const ModalSheet = () => {
  const [isOpen, setOpen] = useState(false);

  const [bathrooms, setBathrooms]=useState('');
  const [bathroomResults, setBathroomResults]=useState([]);
  const [bathroomsList, setBathroomsList] = useState([]);

  const [fuse, setFuse] = useState();

  const options= { distance:20, findAllMatches:true, limit:10 };

  const getBathroomNames = async () => {
    const res = await Axios.get("http://localhost:3001/bathrooms");
    const bathroomNames = res.data.map((bathroom) => bathroom.name);
    setBathroomsList(bathroomNames);
    setFuse(new Fuse(bathroomNames,options));
  }

  useEffect(async () => {
    await getBathroomNames();
  }, [])

  useEffect(() => {
    // console.log(fuse); 
    console.log('fuse init!');
  }, [fuse])
  
  const changeHandler = (e) => {
    const val = e.target.value;
    event.preventDefault(); //prevent default behavior
    const similarBathrooms= fuse.search(val);
    setBathroomResults(similarBathrooms);
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
                  <button className="cancel-button" onClick={() => setOpen(false)}>cancel</button>
                </div>
              </div>

              <div>
                {
                  bathroomResults.map(idx => (
                    <div key={idx}>
                      <h1>{bathroomsList[idx]}</h1>
                      {/* <p>{reviews}</p> */}
                    </div>
                  ))
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
