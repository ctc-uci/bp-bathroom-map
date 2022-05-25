import './SearchCard.css';
import React from 'react';
import toiletIcon from '../assets/toilet_icon.svg';
import star from '../assets/star.svg';

const SearchCard = ({ name, rating, img, hours }) => {
    if (isNaN(rating)) {
        rating = "No ratings";
    }

    let availabilityText = "Open";
    if (!hours) {
        availabilityText = "Unknown Hours";
    }
    else {
        const currDate = new Date();
        const currTime = currDate.getHours()*60 + currDate.getMinutes();
        if (currTime < hours[0] || currTime > hours[1]) {
            availabilityText = "Closed"; //change text color
        }
    }

    if (name.length>20) {
        name = name.slice(0,20) + "...";
    }

    return (
        <div className="search-card-wrapper">
            <div className="picture">
                <img src={toiletIcon} />
            </div>
            <div className="text">
                <div className="name">{name}</div>
                <div className="details">
                    <div className="info">
                        <div className="availability">{availabilityText}</div>
                    </div>
                    <div className="rating">{rating} <img src={star} /></div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard;
