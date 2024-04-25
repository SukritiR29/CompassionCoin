import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { FaInbox } from "react-icons/fa";
import { MdArrowDropDownCircle } from "react-icons/md";
import { IoIosMail } from "react-icons/io";



function AdminApplication() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sender, setSender] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]); // Assuming you have access to all offers
  const [adminApplications, setAdminApplications] = useState([]);
  const [expandedOffer, setExpandedOffer] = useState(null); // New state for tracking expanded offer

  const mailColors = ['bg-pastel-blue', 'bg-pastel-red', 'bg-pastel-purple'];
  let colorIndex = 0;
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
    <div className="text-slate-100 mt-20 ml-2  ">
        <div className="flex gap-4 p-2 pl-4 text-gray-600 mb-2  text-sm">
        <h1 className='text-md font-bold uppercase' > Applications Inbox</h1>
        <FaInbox className="text-md mt-1"/>
        </div>
        <div className="overflow-y-auto mt-4 h-[calc(100vh - 14rem)]">
            {appliedOffers.map((appliedOffer) => {
                const correspondingOffer = allOffers.find(offer => offer._id === appliedOffer.offerId);
                console.log("appliedOffer.offerId:", appliedOffer.offerId);
                console.log("allOffers:", allOffers);
                console.log("correspondingOffer:", correspondingOffer);
                if (correspondingOffer) {
                    // Get the current color from the array and increment the index for the next iteration
                    const currentColor = mailColors[colorIndex];
                    colorIndex = (colorIndex + 1) % mailColors.length; // Ensure the index stays within the bounds of the array
                    return (
                        <div key={appliedOffer._id} className="email w-[20rem] hover:cursor-pointer">
                            <div className="email-header border border-gray-400 border-opacity-60 hover:bg-gray-200 my-4 mx-2  rounded-full p-2 text-gray-800 font-semibold flex" onClick={() => toggleEmail(appliedOffer._id)}>
                                <div className={`h-10 w-10 mr-4 ml-1 rounded-full text-slate-200 flex items-center justify-center ${currentColor} text-slate-950 uppercase`}>
                                    <IoIosMail />
                                </div>
            
                                <div className="flex flex-col justify-between">
                                    <div className="text-gray-600">
                                        <p className="text-sm uppercase">{correspondingOffer.offer}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <p className="text-xs text-slate-600">From: {appliedOffer.name}</p>
                                        
                                        <p className="text-xs text-slate-600">Experience: {appliedOffer.exp}</p>
                                    </div>
                                </div>
                            </div>
            
                            {/* Details section */}
                            {expandedOffer === appliedOffer._id && (
                                <div className="email-details m-2 p-4 border border-blue-950 rounded border-opacity-30">
                                    <div className="border-b-2 border-gray-200 mb-4">
                                    <p className="text-sm mb-1 text-gray-800">{appliedOffer.name}</p>
                                    <p className="text-xs mb-1 text-gray-800">{appliedOffer.email}</p>
                                    </div>
                                 
                                    <p className="text-xs text-gray-800">{correspondingOffer.offer}</p>
                                    {/* More details */}
                                    <p className="text-xs mb-1 text-gray-800">Name: {appliedOffer.name}</p>
                                    <p className="text-xs mb-1 text-gray-800">Experience: {appliedOffer.exp}</p>
                                    <p className="text-xs mb-1 text-gray-800">Email: {appliedOffer.email}</p>
                                    <p className="text-xs mb-1 text-gray-800">Country: {appliedOffer.country}</p>
                                    <p className="text-xs mb-1 text-gray-800">Approach: {appliedOffer.approach}</p>
                                    <div className="flex justify-end mt-2">
                                        <div className="bg-pastel-green text-white px-4 p-1 text-xs rounded">
                                            <button onClick={() => openEmailClient(appliedOffer.email)}>Reply</button>
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
