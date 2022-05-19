import React from 'react';
import Sheet from 'react-modal-sheet';
import ReactStars from "react-rating-stars-component";
import exit_button from "../assets/exit_button.png"
import Review from './Review.js';
import woman from '../assets/woman.png'
import man from '../assets/man.png'
import trans from '../assets/transgender.png'
import './cardSheet.css';


const CardSheet = (props) => {
  const [isOpen, setOpen] = React.useState(true);
  // console.log(props.data.reviews)
  // const reviews = props.data.reviews.map((reviewObj) => <li>{reviewObj.rating}<br></br>{reviewObj.review}</li>);
  const reviews = props.data.reviews.map((reviewObj) => <Review rating={reviewObj.rating} text={reviewObj.review}/>);
  console.log(props.data.imgs);
  const imgs = props.data.imgs.map((img) => <img src={img} className="bathroom-img"/>);
  let sum = 0;
  props.data.reviews.forEach((r) => {
    sum += r.rating;
  })
  let avgValue = sum / props.data.reviews.length;

  return (
    <div>
      {/* <button onClick={() => setOpen(true)}>Open sheet</button> */}

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <div className="sheet">

                <div className='name'>
                  <h1>{props.data.name}</h1>
                    {/* <button className="close-sheet-btn" onClick = {()=>setOpen(false)}>X</button> */}
                    <img className="close-sheet-btn" src={exit_button} onClick = {()=>setOpen(false)}></img>
                </div>
                <ReactStars size={30}
                  value={avgValue}
                  edit={false}
                />
                <div className="row-center">
                  <button className="find-bathroom-btn find-bathroom-btn-text" onClick={props.getDirections}>Go</button>
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
                <h4 className="subtitle-text">Reviews</h4>

                <div className = "reviews">
                  <hr />
                  {/*console.log(reviews)*/}
                  {reviews}
                </div>

              </div>
              {/*TODO: MULTIPLE IMAGES,REVIEWS,MAKE IT LOOK BETTER */}
            </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}

export default CardSheet;
