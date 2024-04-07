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
import { useSession } from 'next-auth/react';



function OfferList() {
  const [offers, setOffers] = useState([]);
  const { data: session, status } = useSession();
  const [usermail, setUserEmail] = useState([]);
  const [sender, setSender] = useState([]);
  const initialFocusRef = React.useRef()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [exp, setExp] = useState("");
  const [approach, setApproach] = useState("");
  


  useEffect(() => {
    async function fetchOffers() {
      try {
        if(status === 'authenticated') {
          console.log("User Email:", session.user.email);
          setUserEmail(session.user.email);
          const response = await fetch("/api/register");
          const data = await response.json();
          console.log("API Response:", data); 
          if(data.success && data.currUser.length > 0) {
            const currentUser = data.currUser.find(user => user.email === session.user.email);
            if(currentUser){
              console.log("From main:", currentUser._id); // Print the user ID in the console
              setSender(currentUser._id);
            }
          }
        }
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
  }, [status, session]);


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
          email,
          country,
          exp,
          approach,
          sender,  
        }),
      });
      if (response.ok) {
        // Application submitted successfully, show success message
        console.log("Application submitted successfully!");
        console.log("got id:", sender);
        console.log("got email:", email);
        setName("");
        setEmail("");
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

  const togglePopover = () => {
    const popoverContent = document.getElementById(`popover-content-${offers._id}`);
    if (popoverContent) {
      popoverContent.classList.toggle('hidden');
    }
  };
  



  return (
    <div className=" w-[50rem] mx-auto ml-[14rem] mt-14  p-4 border border-gray-800">
      <h1 className="text-3xl text-slate-200">Discover Offers</h1>
      <ul className="flex flex-wrap justify-center ">
        {offers.map((offer) => (
          <li key={offer._id} className="border border-yellow-300 rounded m-4 text-slate-200 w-[20rem] p-4">
            <h2 className="">{offer.offer}</h2>
            {/* <p>{offer.userEmail}</p>   */}
            <p className="text-xs text-slate-400">Firm: {offer.firm}</p>
            <p className="text-xs bg-yellow-200 w-fit text-yellow-800 p-1 mt-2 mb-4 rounded border border-yellow-800">{offer.worth}</p>
            <p className="text-xs">{offer.description.length > 100 ? offer.description.substring(0, 100) + "..." : offer.description}</p>
          
            <div className="">
              <Popover
                initialFocusRef={initialFocusRef}
                placement='right'
                closeOnBlur={false}
                className=''
              >
                <PopoverTrigger className=''>
                  <div className="flex justify-end ">
                  <button className=" bg-purple-600 text-xs p-1 pl-4 pr-4 rounded mt-4">Apply</button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-slate-200 rounded text-slate-900 mb-10 mt-20 max-w-[35rem] hidden">
                  <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    <p className="p-2 text-md">Apply to {offer.offer}</p>
                  </PopoverHeader>
                  <PopoverArrow className="text-slate-200 bg-slate-100" />
                  <PopoverBody>
                    <form action="submit" onSubmit={(e) => handleSubmit(e, offer._id)} className="pl-2 pr-2 pb-2 text-sm">
                      <p className="mb-3 text-xs">{offer.description}</p>
                      <p className="text-sm m-1 text-xs">Name:</p>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name:" className="text-xs p-1 rounded m-1" />
                      <p className="text-sm m-1 text-xs">Email:</p>
                      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email:" className="text-xs p-1 rounded m-1" />
                      <div className="flex flex-wrap">
                        <div>
                          <p className="text-xs mt-2 ml-1">Country</p>
                          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country:" className="text-xs p-1 rounded m-1 w-3/4" />
                        </div>
                        <div>
                          <p className="text-xs mt-2  ml-1">Experience:</p>
                          <input type="text" value={exp} onChange={(e) => setExp(e.target.value)} placeholder="2 years:" className="text-xs p-1 rounded m-1 w-3/4" />
                        </div>
                      </div>
                      <p className="text-xs m-2">Your approach:</p>
                      <textarea type="text" value={approach} onChange={(e) => setApproach(e.target.value)} placeholder="Your approach" className="text-xs p-1 ml-2  rounded w-full mb-2" />
                    </form>
                  </PopoverBody>
                  <PopoverFooter border='0' display='flex' alignItems='center' justifyContent='space-between' pb={4}>
                    <div className="text-sm m-2 flex justify-end">
                      <button className="bg-green-600 p-1 rounded text-slate-100 m-2 text-xs" onClick={(e) => handleSubmit(e, offer._id)}>Send Application</button>
                      <PopoverTrigger>
                      <button className="bg-red-600 p-1 pl-2 pr-2 rounded text-slate-100 m-2 text-xs">Close</button>
                      </PopoverTrigger>
                    </div>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OfferList;

