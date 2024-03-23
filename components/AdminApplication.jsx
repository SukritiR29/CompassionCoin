import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

function AdminApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/getApplications");
        const data = await response.json();
        if (data.success) {
          setApplications(data.applications);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred while fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
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
          {applications.map((application) => (
            <tr key={application._id}>
              <td>{application.name}</td>
              <td>{application.country}</td>
              <td>{application.exp}</td>
              <td>{application.approach}</td>
              <td>{application.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminApplication;
