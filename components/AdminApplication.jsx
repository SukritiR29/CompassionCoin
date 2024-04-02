import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { FaInbox } from "react-icons/fa";
import { MdArrowDropDownCircle } from "react-icons/md";


function AdminApplication() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sender, setSender] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]); // Assuming you have access to all offers
  const [adminApplications, setAdminApplications] = useState([]);
  const [expandedOffer, setExpandedOffer] = useState(null); // New state for tracking expanded offer


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

const handleStatusChange = async (applicationId, newStatus) => {
  try {
      // Make a request to update the status of the application
      const response = await fetch(`/api/adminApplications/${applicationId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
          // Update the status of the application in the UI
          setAdminApplications(prevApplications => prevApplications.map(application => {
              if (application._id === applicationId) {
                  return { ...application, status: newStatus };
              }
              return application;
          }));
      } else {
          throw new Error('Failed to update application status');
      }
  } catch (error) {
      console.error('Error updating application status:', error);
  }
};

const toggleEmail = (offerId) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
};

if (status === 'loading' || loading) {
  return <div><span className="loading loading-infinity loading-md"></span>
  </div>;
}

if (status === 'error' || error) {
  return <div>Error: {error}</div>;
}

  return (
    <div className="text-slate-100 bg-gray-950">
        <div className="flex gap-4 p-4 text-slate-200   pt-6 border w-[26rem] border-slate-800 text-sm">
        <h1 >Submitted Applications</h1>
        <FaInbox className="text-md mt-1 "/>
        </div>
        <div>
            {appliedOffers.map((appliedOffer) => {
                const correspondingOffer = allOffers.find(offer => offer._id === appliedOffer.offerId);
                console.log("appliedOffer.offerId:", appliedOffer.offerId);
                console.log("allOffers:", allOffers);
                console.log("correspondingOffer:", correspondingOffer);
                if (correspondingOffer) {
                    return (
                        <div key={appliedOffer._id} className="email border border-slate-800 w-[26rem] hover:cursor-pointer">
                            <div className="email-header p-2 pl-4" onClick={() => toggleEmail(appliedOffer._id)}>
                                <div className="flex justify-between">
                                <p className="text-sm ">Offer: {correspondingOffer.offer}</p>
                                <MdArrowDropDownCircle className="mt-3 mr-6"/>
                                </div>
                                <div className="flex gap-4">
                                <p className="text-xs text-slate-300">Name: {appliedOffer.name}</p>
                                <p className="text-xs text-slate-300">Experience: {appliedOffer.exp}</p>
                                </div>
                                
                            </div>
                            {expandedOffer === appliedOffer._id && (
                                <div className="email-details bg-gray-800">
                                    <p>Offer ID: {appliedOffer.offerId}</p>
                                    <p>Country: {appliedOffer.country}</p>
                                     <p className="">Approach: {appliedOffer.approach}</p>
                                    <p>Status: {appliedOffer.status}</p>
                                    {appliedOffer.status === 'pending' && (
                                        <div>
                                            <button onClick={() => handleStatusChange(appliedOffer._id, 'accepted')}>Accept</button>
                                            <button onClick={() => handleStatusChange(appliedOffer._id, 'rejected')}>Reject</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                }
                return null;
            })}
        </div>
    </div>
  );
}

export default AdminApplication;
