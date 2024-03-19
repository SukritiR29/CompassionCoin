"use client"

import React, { useState } from 'react';

const AdminOffer = () => {
  const [offer, setOffer] = useState('');
  const [firm, setFirm] = useState('');
  const [discription, setDiscription] = useState('');
  const [worth, setWorth] = useState('');
  const [error, setError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(offer);
    console.log(firm);
    console.log(discription);
    console.log(worth);

    const res = await fetch('api/createOffer', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        offer,
        firm,
        discription,
        worth,
      }),
    });

    const {msg} = await res.json();
    setError(msg);
    console.log(error);

  };

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
              onChange={(e) => setDiscription(e.target.value)}
              value={discription}
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
