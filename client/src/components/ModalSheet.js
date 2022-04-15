import React, { useState, useEffect } from 'react';
import './ModalSheet.css';
import Sheet from 'react-modal-sheet';
import Axios from 'axios';
import Fuse from 'fuse.js';

const ModalSheet = () => {
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState();

  const [bathrooms, setBathrooms]=useState('');
  const [bathroomResults, setBathroomResults]=useState([]);
  const [bathroomsList, setBathroomsList] = useState([]);

  const options= { distance:50, findAllMatches:true, limit:10 };
  let fuse;


  useEffect(() => {
    Axios.get("http://localhost:3001/bathrooms").then((response) => {
      // console.log(response);
      const bathroomJSON = response.data;
      let output = [];
      for(var i in bathroomJSON)
        output.push(bathroomJSON[i]["name"]);
      // console.log(output);
      setBathroomsList(output);
      fuse = new Fuse(bathroomsList,options);
    })
  }, [])

  const handleSubmit = (e) => {
    console.log('hi');
    event.preventDefault(); //prevent default behavior
    const similarBathrooms= fuse.search(e.target.value,options);
    console.log(similarBathrooms);
    setBathroomResults(similarBathrooms);
  }

  const changeHandler = (e) => {
    setSearchValue(e.target.value);
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
            <div class="modal-body">
              <div className="search-wrapper">
                <i className="bi bi-search search-icon"></i>
                <input
                  className="search-bar-btn"
                  placeholder="Search Bathrooms"
                  value={searchValue}
                  onChange={changeHandler}
                  autoFocus
                ></input>
              </div>
            {/* <div>
              {
                bathroomResults.map((name, reviews) => (
                  <div>
                    <h1>{name}</h1>
                    <p>{reviews}</p>
                  </div>
                ))
              }
            </div> */}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}

export default ModalSheet;
