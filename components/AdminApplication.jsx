import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

function AdminApplication() {
  const { data: session, status } = useSession();
  const [responses, setResponses] = useState([]);

  const fetchResponses = async () => {
    try {
      if (status === 'authenticated' && session?.user?.role === 'Admin') {
        const response = await fetch("/api/getApplications");
        const data = await response.json();
        console.log("API application Response:", data); 
        if (data.success) {
          setResponses(data.responses);
          console.log("Responses:", data.responses); // Log the responses state
        } else {
          console.error("Failed to fetch submitted responses:", data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching submitted responses:", error);
    }
  };

  useEffect(() => {
    fetchResponses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  return (
    <div className="w-1/2">
      <h1 className="text-3xl text-slate-200">Submitted Responses</h1>
      <table className="border-collapse border border-gray-400 mt-4">
        <thead className="text-slate-100">
          <tr>
            <th className="border border-gray-400 p-2">Name</th>
            <th className="border border-gray-400 p-2">Country</th>
            <th className="border border-gray-400 p-2">Experience</th>
            <th className="border border-gray-400 p-2">Approach</th>
            <th className="border border-gray-400 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response._id} className="text-slate-100">
              <td className="border border-gray-400 p-2">{response.name}</td>
              <td className="border border-gray-400 p-2">{response.country}</td>
              <td className="border border-gray-400 p-2">{response.experience}</td>
              <td className="border border-gray-400 p-2">{response.approach}</td>
              <td className="border border-gray-400 p-2">{response.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminApplication;
