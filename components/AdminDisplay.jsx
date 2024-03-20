// "use client"

// import React, { useState, useEffect } from "react";

// function AdminDisplay() {
//   const [offers, setOffers] = useState([]);

//   useEffect(() => {
//     async function fetchOffers() {
//       try {
//         const response = await fetch("/api/getOffer");
//         const data = await response.json();
//         if (data.success) {
//           setOffers(data.offers);
//         } else {
//           console.error("Failed to fetch offers:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching offers:", error);
//       }
//     }

//     fetchOffers();
//   }, []);

//   return (
//     <div className="border border-opacity-20 border-slate-200 rounded  w-1/2 p-2 m-4 ">
//             <h1 className='text-slate-300 text-3xl font-sans mb-2 pl-4'>Compassion Coin</h1>
//             <div className="">
//             <ul className="">
//         {offers.map((offer) => (
//           <li key={offer._id} className="border border-opacity-20 border-slate-200 rounded m-4 text-slate-200 ">
//             <h2>{offer.offer}</h2>
//             <p>{offer.description}</p>
//             <p>{offer.firm}</p>
//             <p>{offer.worth}</p>
//             <p>{offer.userEmail}</p>
//           </li>
//         ))}
//       </ul>
//             </div>
     
//     </div>
//   );
// }

// export default AdminDisplay;
