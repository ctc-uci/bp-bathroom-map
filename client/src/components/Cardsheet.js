import React, { useState, useEffect } from 'react';
import Sheet from 'react-modal-sheet';
import ReactStars from "react-rating-stars-component";
import exit_button from "../assets/exit_button.png"
import Review from './Review.js';
import woman from '../assets/woman.png';
import man from '../assets/man.png';
import trans from '../assets/transgender.png';
import './cardSheet.css';

import AddReview from './AddReview.js';

/*
TODO:
  - Use object destructuring for props
  - Import useState and useEffect from React
  - isOpen should be a prop (allows modal control from outside)
    - Also pass setter function for isOpen
  - onClose and reload should be a seperate named function
*/

const CardSheet = ({ data, reload, getDirections, getSpecificDirections, showRestroomCard, setShowRestroomCard }) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [avg, setAvg] = useState(0);
  // console.log(props);

  const reviews = data.reviews.map((reviewObj) => <Review rating={reviewObj.rating} text={reviewObj.review}/>);
  // console.log(props.data.imgs);
  const imgs = data.imgs.map((img) => <img src={img} className="bathroom-img"/>);


  const toggleAddReview = (val) => {
    setReviewOpen(val);
  }

  const computeAverage = (data) => {

    let sum = 0;
    data.reviews.forEach((r) => {
      sum += r.rating;
    })
    let avgValue = sum * 1.0 / data.reviews.length;
    // console.log(avgValue)
    setAvg(<ReactStars size={30}
      value={avgValue}
      edit={false}
      isHalf={true}
    />);
  }


  useEffect(() => {
    computeAverage(data)
  }, [])

  const onCloseHandler = () => {
    setShowRestroomCard(false);
    setReviewOpen(false);
  }


  return (
    <div>
      {/* <button onClick={() => setOpen(true)}>Open sheet</button> */}

      <Sheet isOpen={showRestroomCard} onClose={onCloseHandler}>
        <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              {reviewOpen ?
                <AddReview
                  name={data.name}
                  id={data.id}
                  reload={() => {const newData = reload(); console.log('reloading'); computeAverage(data)}}
                  // reAverage={computeAverage}
                  goBack={toggleAddReview}
                />
              :
              <div className="sheet" id="sheet">

                <div className='name'>
                  <h1 className='nameSpace'>{data.name}</h1>
                    {/* <button className="close-sheet-btn" onClick = {()=>setOpen(false)}>X</button> */}
                    <img className="close-sheet-btn" src={exit_button} onClick = {()=>setShowRestroomCard(false)}></img>
                </div>
                <div className="row-start">
                {/* <ReactStars size={30}
                  value={avg}
                  edit={false}
                  isHalf={true}
                /> */}
                {avg}
                <span className="num-ratings">({reviews.length})</span>
                </div>
                <div className="row-center">
                  <button
                    className="find-bathroom-btn find-bathroom-btn-text"
                    onClick={() => {
                      getSpecificDirections(data.name)
                      setShowRestroomCard(false)
                    }}
                  >
                    Go
                  </button>
                </div>

                <h4 className="subtitle-text">Images</h4>
                <div class="sideScroll">
                  {/* <img
                  src={props.data.img}
                  className="bathroom-img"
                  />
                  <img
                  src={props.data.img}
                  className="bathroom-img"
                  />
                  <img
                  src={props.data.img}
                  className="bathroom-img"
                  /> */}
                  {imgs}
                </div>
                <h4 className="subtitle-text">Available Bathrooms</h4>
                {/* Icons for male, female, and gender neutral */}
                <img src={woman}/>
                <img src={man}/>
                <img src={trans}/>

                <div></div>
                <div className="row-between">
                  <h4 className="subtitle-text">Reviews</h4>
                  <span onClick={()=>{toggleAddReview(true)}}className="add-review-btn">Write a Review</span>
                </div>

                <div className = "reviews">
                  <hr />
                  {/*console.log(reviews)*/}
                  {reviews}
                </div>
              {/*TODO: MULTIPLE IMAGES,REVIEWS,MAKE IT LOOK BETTER */}
              </div>
          }
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>


    </div>
  );
}

export default CardSheet;

