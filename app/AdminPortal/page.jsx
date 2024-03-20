"use client"

import React, { useState, useEffect } from 'react';
import AdminSide from '@/components/AdminSide';
import AdminOffer from '@/components/AdminOffer';
import { useSession } from 'next-auth/react';
import AdminDisplay from '@/components/AdminDisplay';


const Page = () => {
  const [showAdminOffer, setShowAdminOffer] = useState(false);
  const { data: session, status } = useSession();
  const [offers, setOffers] = useState([]);
 const [useremail, setUserEmail] = useState([]);
 const [user, setUser] = useState([]);



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
            console.log("User ID:", currentUser._id); // Print the user ID in the console
            setUser(currentUser._id);

            // Fetch offers using the fetched user ID
            const offerResponse = await fetch(`/api/getOffer?userId=${currentUser._id}`);
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
    <div className='bg-slate-900 h-screen '>
      <div className='flex'>
        <AdminSide className='mt-4 ml-4 mb-4' />
        <div className="border border-opacity-20 border-slate-200 rounded  w-1/2 p-2 m-4 ">
            <h1 className='text-slate-300 text-3xl font-sans mb-2 pl-4'>Compassion Coin</h1>
            <div className="">
            <ul className="">
        {offers.map((offer) => (
          <li key={offer._id} className="border border-opacity-20 border-slate-200 rounded m-4 text-slate-200 ">
            <h2>{offer.offer}</h2>
            <p>{offer.description}</p>
            <p>{offer.firm}</p>
            <p>{offer.worth}</p>
            <p>{offer.userEmail}</p>
          </li>
        ))}
      </ul>
            </div>
     
    </div>
        <div className='m-4 justify-end'>
          <button className='text-sm text-slate-200 bg-blue-500 p-2 rounded' onClick={handleAddOfferClick}>
            {showAdminOffer ? 'Close Offer -' : 'Add Offer +'}
          </button>
          {showAdminOffer && <AdminOffer />}
        </div>
      </div>
    </div>
  );
};

export default Page;
