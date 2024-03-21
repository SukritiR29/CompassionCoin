"use client"

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'


function OfferList() {
  const [offers, setOffers] = useState([]);

  const initialFocusRef = React.useRef()

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [exp, setExp] = useState("");
  const [approach, setApproach] = useState("");

  const handleSubmit = async (e, offerId) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submitApplications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offerId,
          name,
          country,
          exp,
          approach,
        }),
      });
      if (response.ok) {
        // Application submitted successfully, show success message
        console.log("Application submitted successfully!");
        setName("");
        setCountry("");
        setExp("");
        setApproach("");
      } else {
        // Error occurred while submitting application
        console.error("Failed to submit application:", response.statusText);
        alert("Failed to submit application. Please try again later.");

      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again later.");

    }
  };
  

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch("/api/getOffer");
        const data = await response.json();
        if (data.success) {
          setOffers(data.offers);
        } else {
          console.error("Failed to fetch offers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    }

    fetchOffers();
  }, []);

  return (
    <div className="w-1/2">
      <h1 className="text-3xl text-slate-200">Offers</h1>
      <ul className="">
        {offers.map((offer) => (
          <li key={offer._id} className="border m-4 text-slate-200">
            <h2>{offer.offer}</h2>
            <p>{offer.description}</p>
            <p>{offer.firm}</p>
            <p>{offer.worth}</p>
            <p>{offer.userEmail}</p>
            
            <>
            <Popover
      initialFocusRef={initialFocusRef}
      placement='bottom'
      closeOnBlur={false}
    >
      <PopoverTrigger className=''>
        <button className="bg-green-600 p-2 rounded m-2">Apply</button>
      </PopoverTrigger>
      <PopoverContent className="bg-slate-100 rounded text-slate-900">
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
        <p className="p-2">Apply to {offer.offer}</p>      
          </PopoverHeader>
        <PopoverArrow className="text-slate-200 bg-slate-100"/>
        {/* <PopoverCloseButton /> */}
        <PopoverBody>
          <form action="submit" onSubmit={(e) => handleSubmit(e, offer._id)} className="pl-2 pr-2 pb-2 text-sm">
           <p className="mb-3">{offer.description}</p>
           <p className="text-sm m-1">Name:</p>
           <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name:" className="text-xs p-1 rounded m-1" />
           <div className="flex flex-wrap">
            <div>
            <p className="text-sm m-1">Country</p>
           <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country:" className="text-xs p-1 rounded m-1 w-3/4" />
            </div>
           <div>
           <p className="text-sm m-1">Expericence:</p>
           <input type="text" value={exp} onChange={(e) => setExp(e.target.value)} placeholder="2 years:" className="text-xs p-1 rounded m-1 w-3/4" />
           </div>
          
           </div>
          
           <p className="text-sm">You approach:</p>
           <textarea type="text" value={approach} onChange={(e) => setApproach(e.target.value)} placeholder="Name:" className="text-xs p-1 rounded w-full rounded" />
          </form>
        </PopoverBody>
        <PopoverFooter
          border='0'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          pb={4}
        >
          <div className="text-sm m-2 justify-end">
            <button className="bg-green-600 p-1 rounded text-slate-100 m-2" onClick={(e) => handleSubmit(e, offer._id)}>Send Application</button>
            <button className="bg-red-600 p-1 rounded text-slate-100 m-2" ref={initialFocusRef}>
              Cancel
            </button>
          </div>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
 
</>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OfferList;

