"use client"

import React, { useState, useEffect } from 'react';
import AdminSide from '@/components/AdminSide';
import AdminOffer from '@/components/AdminOffer';
import { useSession } from 'next-auth/react';
import AdminApplication from '@/components/AdminApplication';
import Nav from "@/components/nav";
import { MdOutlineLocalOffer } from "react-icons/md";




const Page = () => {
  const [showAdminOffer, setShowAdminOffer] = useState(false);
  const { data: session, status } = useSession();
  const [offers, setOffers] = useState([]);
 const [useremail, setUserEmail] = useState([]);
 const [user, setUser] = useState([]);
 const [expandedOfferId, setExpandedOfferId] = useState(null); 

 const toggleExpansion = (offerId) => {
  setExpandedOfferId(expandedOfferId === offerId ? null : offerId);
};


 useEffect(() => {
  async function fetchUser() {
    try {
      if (status === 'authenticated') {
        console.log("User Email:", session.user.email);
        setUserEmail(session.user.email);
        const response = await fetch("/api/register");
        const data = await response.json();
        console.log("API Response:", data); 
        if (data.success && data.currUser.length > 0) {
          // Find the user document where the email matches the logged-in user's email
          const currentUser = data.currUser.find(user => user.email === session.user.email);
          if (currentUser) {
            console.log("From main:", currentUser._id); // Print the user ID in the console
            setUser(currentUser._id);

            // Fetch offers using the fetched user ID
            const offerResponse = await fetch(`/api/createOffer`);
            
            if (!offerResponse.ok) {
              throw new Error(`Failed to fetch offers: ${offerResponse.statusText}`);
            }
            const offerData = await offerResponse.json();
            if (offerData.success) {
              setOffers(offerData.offers);
            } else {
              console.error("Failed to fetch offers:", offerData.message);
            }
          } else {
            console.error("User not found for email:", session.user.email);
          }
        } else {
          console.error("Failed to fetch user:", data.message);
        }
      }
    } catch(error) {
      console.error("Error fetching user or offers:", error);
    }
  }

  fetchUser();
}, [status, session]);





  const handleAddOfferClick = () => {
    setShowAdminOffer((prevShowAdminOffer) => !prevShowAdminOffer);
  };

  return (
    <div className='bg-white h-full'>
      <Nav style={{ zIndex: '100' }}/>
      <div className='flex '>
        <AdminSide className='mt-4 ml-4 mb-4 w-1/4' />
        <div className=" bg-white mt-14 ml-[14rem]  w-[100rem]  p-2 m border-r-2">
          <div className='flex justify-between '>
            <h1 className='text-gray-600 font-bold text-lg  text-center font-sans p-4 uppercase font-bold flex'>Offers <MdOutlineLocalOffer className='text-gray-600 text-lg  text-center m-1'/></h1>
            <div className='m-4 justify-end flex items-end ml-20' style={{ position: 'relative' }}>
  <button
    className='text-sm w-max text-gray-800 mr-10 font-bold bg-pastel-purple hover:bg-purple-500 p-2 rounded'
    onClick={handleAddOfferClick}
    style={{ position: 'absolute', top: '0', right: '0' }}
  >
    {showAdminOffer ? 'Close Offer -' : 'Add Offer +'}
  </button>
  {showAdminOffer && <AdminOffer />}
</div>

        </div>
        <div className="flex flex-wrap justify-center  mb-10">
            {offers.map((offer) => (
              <div 
                key={offer._id} 
                className={`block w-[17rem] m-6 mt-4 flex flex-wrap justify-between p-4 bg-light-blue pb-6 border-yellow-400 text-slate-400 rounded-lg shadow text-xs`}
                style={{height: expandedOfferId === offer._id ? 'auto' : '150px'}} 
                onClick={() => toggleExpansion(offer._id)} 
              >
                <div className="w-max">
                <div className='flex justify-between'>
                  <h2 className="text-slate-600 text-sm font-bold underline">{offer.offer}</h2>
                  <p className="text-xs bg-pastel-blue text-black font-semibold w-fit p-1 rounded pl-2 pr-2">{offer.worth}</p>
                  </div>
                  <p className='text-slate-600 mt-1'>{offer.firm}</p>
              
                
                  <p className='mb-2  text-slate-700 font-light'>{expandedOfferId === offer._id ? offer.description : offer.description.slice(0, 80) + '.......'}</p>
                  <div className='flex justify-end m-1'>
                  <button className=' text-xs text-white h-fit  pl-2 pr-2 py-1  rounded flex justify-end bg-pastel-green '>View</button>
                  </div>
                
                </div>
              </div>
            ))}
</div>

     
    </div>
        <div>
        <AdminApplication offers={offers}/>
        </div>
      </div>
    </div>
  );
};

export default Page;
