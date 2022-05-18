import React from 'react';

const Review = (props) => {
    return (
        <div>
            <br />
            <div>{/* star component */}{props.rating}</div>
            <p>{props.text}</p>
            <br />
            <hr />
        </div>
    )
};

export default Review;