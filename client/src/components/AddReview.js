import axios from 'axios';
import React from 'react';
import ReactStars from "react-rating-stars-component";

import backArrow from '../assets/arrow_back.png';
import './addReview.css';

const AddReview = (props) => {
  const [stars, setStars] = React.useState(null)

  const updateRating = (newVal) => {
    setStars(newVal);
  }

  const submitReview = () => {
    let data = {};
    const text = document.getElementById('review-text').value;
    data.rate = stars;
    data.review = text;
    data.id = props.id;
    console.log(stars);
    console.log(text);
    console.log(props.id);

    // make request to insert in backend
    axios.post('http://localhost:3001/review', {}, {
      params: data
    })
    .then(res => {
      console.log(res);
      props.goBack(false);
      props.reload();
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="add-review-box">
      <img className="back-btn" src={backArrow} onClick = {()=>props.goBack(false)}></img>
      <div className='row-center'>
        <h1 className='nameSpace'>{props.name}</h1>
      </div>
      <div className='row-center'>
      <ReactStars
        id="stars"
        edit={true}
        size={50}
        isHalf={true}
        onChange={updateRating}
      />
      </div>
      <br />
      <div className='row-center'>
        <textarea className="review-text" id="review-text" name="review-text" rows="8" cols="50"
        placeholder='Write a review here'></textarea>
      </div>
      <br />
      <div className='row-center'>
        <button className='post-btn post-btn-text' onClick={submitReview}>Post</button>
      </div>

    </div>
  );
}

export default AddReview;
