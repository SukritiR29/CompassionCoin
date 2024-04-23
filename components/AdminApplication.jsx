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



const openEmailClient = (recipientEmail) => {
    const mailtoUrl = `mailto:${recipientEmail}`;
    window.open(mailtoUrl);
}

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
    <div className="text-slate-100 bg-blue-950 h-full mt-14 ">
        <div className="flex gap-4 p-4 text-slate-200   pt-6 mb-2 shadow border border-gray-500 text-sm">
        <h1 className='text-md font-bold text-slate-200' > Applications Inbox</h1>
        <FaInbox className="text-md mt-1 text-slate-200"/>
        </div>
        <div className="overflow-y-auto h-[calc(100vh - 14rem)]">
            {appliedOffers.map((appliedOffer) => {
                const correspondingOffer = allOffers.find(offer => offer._id === appliedOffer.offerId);
                console.log("appliedOffer.offerId:", appliedOffer.offerId);
                console.log("allOffers:", allOffers);
                console.log("correspondingOffer:", correspondingOffer);
                if (correspondingOffer) {
                    return (
                        <div key={appliedOffer._id} className="email shadow border border-gray-500 border-opacity-30 w-[20rem] hover:cursor-pointer">
                            <div className="email-header p-2 pl-4 text-slate-200 font-semibold" onClick={() => toggleEmail(appliedOffer._id)}>
                                <div className="flex justify-between text-slate-200">
                                <p className="text-sm ">Offer: {correspondingOffer.offer}</p>
                                <MdArrowDropDownCircle className="mt-3 mr-6 text-yellow-500"/>
                                </div>
                                <div className="flex gap-4">
                                <p className="text-xs text-slate-200">Name: {appliedOffer.name}</p>
                                <p className="text-xs text-slate-200">Experience: {appliedOffer.exp}</p>
                                </div>
                                
                            </div>
                            {expandedOffer === appliedOffer._id && (
                                <div className="email-details bg-white">
                                    <div className="p-4 pb-1 border border-blue-950 border-opacity-20">
                                        <p className="text-sm mb-1 text-gray-600 "> {appliedOffer.name} </p>
                                        <p className="text-xs mb-1 text-gray-600">{appliedOffer.email}</p>
                                        <p className="text-xs text-gray-600">{correspondingOffer.offer}</p>
                                       

                                    </div>
                                    <div className="p-4 text-xs text-gray-800">
                                        <p className="mb-1">Name: {appliedOffer.name}</p>
                                    <p className="mb-1">Experience: {appliedOffer.exp}</p>
                                        
                                       
                                        <p className="mb-1">Email: {appliedOffer.email}</p>
                                    <p className="mb-1">Country: {appliedOffer.country}</p>
                                       
                                     <p className="mt-3">Approach: {appliedOffer.approach}</p>
                                   
                                     <div className="flex justify-end m-2 mt-6">
                                        <div className="bg-yellow-600 text-white p-2 rounded">
                                            <button onClick={() => openEmailClient(appliedOffer.email)} >Reply</button>
                                        </div>
                                    </div>
                                    </div>
                                  
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
