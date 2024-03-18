"use client"

import React, { useState } from 'react';

const AdminOffer = () => {
  const [offerName, setOfferName] = useState('');
  const [offerDetails, setOfferDetails] = useState('');
  const [offerPrize, setOfferPrize] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Perform form validation here if necessary
    
    try {
      const res = await fetch('/api/createOffer', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              offerName,
              offerDetails,
              offerPrize,
          }),
      });
  
      if (res.ok) {
          // Offer created successfully
          console.log('Offer created successfully');
      } else {
          // Offer creation failed
          console.error('Offer creation failed');
      }
  } catch (error) {
      // Error occurred while making the request
      console.error('Error creating offer:', error);
  }
  };

  return (
    <div className=''>
      <h1 className='text-slate-200'>Add Offer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='offerName'>Offer Name:</label>
          <input 
            type='text' 
            id='offerName' 
            value={offerName} 
            onChange={(e) => setOfferName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor='offerDetails'>Offer Details:</label>
          <textarea 
            id='offerDetails' 
            value={offerDetails} 
            onChange={(e) => setOfferDetails(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor='offerPrize'>Offer Prize:</label>
          <input 
            type='text' 
            id='offerPrize' 
            value={offerPrize} 
            onChange={(e) => setOfferPrize(e.target.value)} 
            required 
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AdminOffer;
