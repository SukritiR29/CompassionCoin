import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { FaCircleDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { SiGoogleforms } from "react-icons/si";


function UserApplication() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sender, setSender] = useState(null);
    const [appliedOffers, setAppliedOffers] = useState([]);
    const [allOffers, setAllOffers] = useState([]);
    const mailColors = ['bg-pastel-blue', 'bg-pastel-red', 'bg-pastel-purple'];
    let colorIndex = 0;

    useEffect(() => {
        async function fetchOffers() {
            try {
                if (status === 'authenticated') {
                    const userEmail = session.user.email;
                    const userResponse = await fetch(`/api/getUser?email=${userEmail}`);
                    const userData = await userResponse.json();

                    if (userData.success && userData.user) {
                        const currentUser = userData.user;
                        setSender(currentUser._id);
                        setAppliedOffers(currentUser.appliedOffer || []);
                    } else {
                        console.error("User not found or no applied offers for the user");
                    }
                }

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
        <div className="w-1/4 text-slate-100 mt-20 ml-2">
            <div className="flex gap-4 p-2 pl-4 text-gray-600 mb-2 text-sm">
                <h1 className="w-fit text-md font-bold">Applied Programs</h1>
            </div>
            
            <ul>
                {appliedOffers.map((appliedOffer) => {
                    const correspondingOffer = allOffers.find(offer => offer._id === appliedOffer.offerId);
                    if (correspondingOffer) {
                        const currentColor = mailColors[colorIndex];
                        colorIndex = (colorIndex + 1) % mailColors.length;

                        return (
                            <li key={appliedOffer._id} className="w-fit mb-6 pl-4 flex items-center border w-full m-2 p-2 rounded-full border-gray-600 border-opacity-50">
                                <div className={`h-10 w-10 mr-2 rounded-full flex items-center justify-center ${currentColor}`}>
                                    <SiGoogleforms className="text-gray-800 text-lg"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-800">Offer: {correspondingOffer.offer}</p>
                                    <p className="text-xs text-gray-800 ml-2">Firm: {correspondingOffer.firm}</p>
                                </div>
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
