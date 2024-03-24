"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';


const AdminOffer = () => {
  const [offer, setOffer] = useState('');
  const [firm, setFirm] = useState('');
  const [description, setDescription] = useState('');
  const [worth, setWorth] = useState('');
  const [error, setError] = useState([]);
  const [user, setUser] = useState([]);

  const { data: session, status } = useSession();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    console.log("Session:", session);
      if (status === 'authenticated') {
        console.log("User Email:", session.user.email);
        setUserEmail(session.user.email);
      }
    }, [session, status]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userEmail !== session.user.email) {
      console.error('Email validation failed');
      setError(['Email validation failed']); // Update error state with validation error message
      return;
    }

    console.log(offer);
    console.log(firm);
    console.log(userEmail);
  
    try {
      // Fetch user data
      const response = await fetch("/api/register");
      const data = await response.json();
      console.log("API Response:", data); 
      if (data.success && data.currUser.length > 0) {
        // Find the user document where the email matches the logged-in user's email
        const currentUser = data.currUser.find(user => user.email === session.user.email);
        if (currentUser) {
          console.log("User ID:", currentUser._id); // Print the user ID in the console
          setUser(currentUser._id);
  
          // Submit offer data along with user ID
          const res = await fetch('api/createOffer', {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              userEmail,
              userId: currentUser._id, // Include currentUser._id in the request body
              offer,
              firm,
              description,
              worth,
            }),
          });
  
          if (!res.ok) {
            throw new Error('Failed to add offer');
          }
  
          const { msg } = await res.json();
          setError(msg);
          console.log(msg); // Log the success message from the server
        } else {
          console.error("User not found for email:", session.user.email);
        }
      } else {
        console.error("Failed to fetch offers:", data.message);
      }
    } catch (error) {
      console.error(error); // Log any errors that occurred during the fetch request
      setError(['An error occurred while adding the offer']); // Update error state
    }

    
  };

  const [offers, setOffers] = useState([]);

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
    <div className=''>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Offer Title
            </label>
            <input
              onChange={(e) => setOffer(e.target.value)}
              value={offer}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Offer Title"
            />
          </div>
         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email:
          </label>
          <input
            value={userEmail}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Email"
            readOnly // Prevent users from editing the email field
          />
        </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Firm Name
            </label>
            <input
              onChange={(e) => setFirm(e.target.value)}
              value={firm}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Firm Name"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Description
            </label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Description"
            />
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as youd like</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Worth
            </label>
            <input
              onChange={(e) => setWorth(e.target.value)}
              value={worth}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Worth"
            />
          </div>
          <div className="relative flex">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-end" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>

   
     
    
    </div>
  );
};

export default AdminOffer;

