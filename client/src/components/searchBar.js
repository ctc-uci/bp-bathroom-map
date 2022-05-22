// import React, { useState, useEffect } from 'react';
// import Fuse from 'fuse.js';
// import "./searchBar.css";
// import Axios from "axios";


// function SearchBar() {
//     const [bathrooms, setBathrooms]=useState('')
//     const [bathroomResults, setBathroomResults]=useState([])
//     const [bathroomsList, setBathroomsList] = useState([]);

//     const options= { distance:50, findAllMatches:true, limit:10 };
//     let fuse;


//     useEffect(() => {
//         Axios.get("http://localhost:3001/bathrooms").then((response) => {
//             console.log(response);
//             const bathroomJSON = response.data;
//             let output = [];
//             for(var i in bathroomJSON)
//                 output.push([bathroomJSON[i]["name"], bathroomJSON[i]["reviews"]]);
//             setBathroomsList(output);
//         })
//     })

//     useEffect(() => {
//         fuse = new Fuse(bathrooms_list,options);
//     }, [listOfBathrooms])

//     const handleSubmit = (event) => {
//         event.preventDefault() //prevent default behavior
//         const similarBathrooms= fuse.search(bathrooms)//,options)
//         setBathroomResults(similarBathrooms)
//     }

//     return (
//         <>
//             <form autoComplete="off" onSubmit={handleSubmit}>
//                 <div align='center' className="dropdown">
//                     <button className="material-icons" onClick={handleSubmit} >search</button>
//                     <input type='text' value={bathrooms}  placeholder ='Search..' onChange={handleSubmit} id="my-input"></input> 
//                 </div>
//             </form>

//             <div>
//                 {
//                     bathroomResults.map((name, reviews) => (
//                        <div>
//                             <h1>{name}</h1>
//                             <p>{reviews}</p>
//                        </div>
//                     ))
//                 }
//             </div>
//         </>
//     )
// }

// export default SearchBar;