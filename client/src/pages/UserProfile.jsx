import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { auth } = useAuth();

  const fetchUserDetails = async () => {
    try {
      const response = await axios.post('http://localhost:8000/getuserDetails', {
        userId: auth.data.id,
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.patch('http://localhost:8000/userDetails', {
        id: auth.data.id,
        data: userDetails,
      });
      setIsEditing(false);
      fetchUserDetails();
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center pt-5 bg-gray-100 w-full h-full">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">User Profile</h1>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-1">Email:</label>
              <input
                type="email"
                name="Email"
                value={userDetails.Email || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-1">Name:</label>
              <input
                type="text"
                name="IndividualName"
                value={userDetails.Individual?.IndividualName || ''}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    Individual: { ...userDetails.Individual, IndividualName: e.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-1">Mobile Number:</label>
              <input
                type="text"
                name="IndividualMobile"
                value={userDetails.Individual?.IndividualMobile || ''}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    Individual: { ...userDetails.Individual, IndividualMobile: e.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Email:</span> {userDetails.Email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Name:</span> {userDetails.Individual?.IndividualName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Mobile Number:</span> {userDetails.Individual?.IndividualMobile}
            </p>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
