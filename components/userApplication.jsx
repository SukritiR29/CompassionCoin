    "use client"

    import React, { useState, useEffect } from "react";
    import { useSession } from 'next-auth/react';
    import { FaCircleDot } from "react-icons/fa6";


    function UserApplication() {
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
        <div className="w-1/6 text-slate-100 bg-gray-950 mt-14">
            <div className="flex m-0 p-3 text-slate-200   pt-4">
            <h1 className="w-fit">Applied Offers</h1>
            </div>
            
            <ul>
            {appliedOffers.map((appliedOffer) => {
    const correspondingOffer = allOffers.find(offer => offer._id === appliedOffer.offerId);
    console.log("appliedOffer.offerId:", appliedOffer.offerId);
    console.log("allOffers:", allOffers);
    console.log("correspondingOffer:", correspondingOffer);
    if (correspondingOffer) {
        return (
            <li key={appliedOffer._id} className="w-fit mb-6 pl-4">
                <div className="flex">
                <FaCircleDot className='text-yellow-500 text-xs mt-1 mr-2'/>
                <p className="text-sm">Offer: {correspondingOffer.offer}</p>
                </div>
                <p className="text-xs ml-6  ">Firm: {correspondingOffer.firm}</p>
            </li>
        );
    }
    return null;
})}
            </ul>
        </div>
    );
}

    export default UserApplication;
