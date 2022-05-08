import React, { useState } from 'react';
import './ModalSheet.css';
import Sheet from 'react-modal-sheet';
import search_icon from "../assets/search_icon.png";

const ModalSheet = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState();

  const changeHandler = (e) => {
    setSearchValue(e.target.value)
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
            <div class="modal-body">
              <div className="search-wrapper">
                <img src={search_icon} className='search-image'></img>
                {/* <i className="bi bi-search search-icon"></i> */}
                <input
                  className="search-bar-btn"
                  placeholder="Search Bathrooms"
                  value={searchValue}
                  onChange={changeHandler}
                  autoFocus
                ></input>
              </div>
            <p>stuff goes here</p>
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}

export default ModalSheet;
