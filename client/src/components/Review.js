import React from 'react';
import ReactStars from "react-rating-stars-component";

const Review = (props) => {
    return (
        <div>
            <br />
            <div>
              <ReactStars size={20}
                  value={props.rating}
                  edit={false}
                  isHalf={true}
                />
            </div>
            <p>{props.text}</p>
            <br />
            <hr />
        </div>
    )
};

export default Review;
