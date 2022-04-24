import './SearchCard.css';
import React from 'react';
import toiletIcon from '../assets/toilet_icon.svg';
import star from '../assets/star.svg';

const SearchCard = ({ name, location, rating, img }) => {
    return (
        <div className="search-card-wrapper">
            <div className="picture">
                <img src={toiletIcon} />
            </div>
            <div className="text">
                <div className="name">{name}</div>
                <div className="details">
                    <div className="info">
                        <div className="availability">Open</div>
                        <div className="address">{location}</div>
                    </div>
                    <div className="rating">{rating} <img src={star} /></div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard;
