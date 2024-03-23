import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

function AdminApplication() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sender, setSender] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]); // Assuming you have access to all offers


  useEffect(() => {
      async function fetchOffers() {
      try {
          if (status === 'authenticated') {
          const userEmail = session.user.email;
          console.log("User Email:", userEmail);

          // Fetch the user document based on the email
          const userResponse = await fetch(`/api/getUser?email=${userEmail}`);
          const userData = await userResponse.json();
          console.log("User Data:", userData);

          if (userData.success && userData.user) {
              const currentUser = userData.user;
              console.log("Current User ID:", currentUser._id); // Print the user ID in the console
              setSender(currentUser._id);

              // If appliedOffer is an array in the user document, you can directly set it in state
              setAppliedOffers(currentUser.appliedOffer || []);
              console.log("Applied Offers:", currentUser.appliedOffer); // Log the appliedOffer array

          } else {
              console.error("User not found or no applied offers for the user");
          }
          }

          // Fetch other offers
          const offerResponse = await fetch("/api/getOffer");
          const offerData = await offerResponse.json();
          if (offerData.success) {
              setAllOffers(offerData.offers);
          } else {
              console.error("Failed to fetch offers:", offerData.message);
          }
      } catch (error) {
          console.error("Error fetching offers:", error);
      } finally {
          setLoading(false);
      }
  }

  fetchOffers();
}, [status, session]);

  if (status === 'loading' || loading) {
      return <div>Loading...</div>;
  }

  if (status === 'error' || error) {
      return <div>Error: {error}</div>;
  }


  return (
    <div className="text-slate-100">
      <h1>Submitted Applications</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Experience</th>
            <th>Approach</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {appliedOffers.map((appliedOffer) => {
    const correspondingOffer = allOffers.find(offer => offer._id === appliedOffer.offerId);
    console.log("appliedOffer.offerId:", appliedOffer.offerId);
    console.log("allOffers:", allOffers);
    console.log("correspondingOffer:", correspondingOffer);
    if (correspondingOffer) {
        return (
            <li key={appliedOffer._id}>
                <p>Offer ID: {appliedOffer.offerId}</p>
                <p>Offer: {correspondingOffer.offer}</p>
                <p>Name: {appliedOffer.name}</p>
                <p>Country: {appliedOffer.country}</p>
                <p>Status: {appliedOffer.status}</p>
            </li>
        );
    }
    return null;
})}
        </tbody>
      </table>
    </div>
  );
}

export default AdminApplication;
