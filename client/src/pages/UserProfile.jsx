import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import AddDate from '../components/AddDate';
import UploadFile from '../components/UploadFile';
import { useNavigate, useLocation } from 'react-router-dom';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    
    console.log(auth.data);
    try {
      const response = await axios.post('http://localhost:8000/getuserDetails', {
        userId: auth.data.userid,
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      Individual: {
        ...prevDetails.Individual,
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedICTTeaching = checked
      ? [...(userDetails.Individual?.IndividualICTTeaching || []), name]
      : userDetails.Individual?.IndividualICTTeaching.filter((item) => item !== name);
    setUserDetails({
      ...userDetails,
      Individual: { ...userDetails.Individual, IndividualICTTeaching: updatedICTTeaching },
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch('http://localhost:8000/userDetails', {
        id: auth.data.userid,
        data: userDetails,
      });
      setIsEditing(false);
      fetchUserDetails()
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center pt-5 bg-white w-full h-full">
      {auth.data.CustomerType === 'Admin' ? (
        <div className="w-full flex justify-start px-6 mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
            onClick={() => navigate('/Admin', { replace: true })}
          >
            Back to Dashboard
          </button>
        </div>
      ) : null}
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">User Profile</h1>
        <div className="flex justify-center mb-4">
          <UploadFile
            Accept="image/*"
            Id="profilePicture"
            Name="Profile Picture"
            handleinputChange={(file) =>
              setUserDetails({
                ...userDetails,
                Individual: { ...userDetails.Individual, profilePicture: file },
              })
            }
          />
        </div>
        {isEditing ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Salutation:</label>
                  <select
                    name="IndividualSalutation"
                    value={userDetails.Individual?.IndividualSalutation || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Name:</label>
                  <input
                    type="text"
                    name="IndividualName"
                    value={userDetails.Individual?.IndividualName || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Mobile:</label>
                  <input
                    type="text"
                    name="IndividualMobile"
                    value={userDetails.Individual?.IndividualMobile || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Teaching Status:</label>
                  <select
                    name="TeachingStatus"
                    value={userDetails.Individual?.IndividualTeachingStatus || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="Tenured">Tenured</option>
                    <option value="Permanent">Permanent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Designation:</label>
                  <select
                    name="IndividualDesignation"
                    value={userDetails.Individual?.IndividualDesignation || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Faculty:</label>
                  <select
                    name="IndividualFaculty"
                    value={userDetails.Individual?.IndividualFaculty || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="Faculty of Technology and Engineering">Faculty of Technology and Engineering</option>
                    {/* <option value="Faculty of Science">Faculty of Science</option> */}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Department:</label>
                  <select
                    name="IndividualDepartment"
                    value={userDetails.Individual?.IndividualDepartment || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Qualified GATE Exam:</label>
                  <div className="flex space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="IndividualGATEQualified"
                        value="Yes"
                        checked={userDetails.Individual?.IndividualGATEQualified === 'Yes'}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="IndividualGATEQualified"
                        value="No"
                        checked={userDetails.Individual?.IndividualGATEQualified === 'No'}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Joining Date:</label>
                  <AddDate
                    val={userDetails.Individual?.IndividualJoiningDate}
                    handleinputChange={(e, cellId, rowId) =>
                      setUserDetails({
                        ...userDetails,
                        Individual: { ...userDetails.Individual, IndividualJoiningDate: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Birth Date:</label>
                  <AddDate
                    val={userDetails.Individual?.IndividualBirthDate}
                    handleinputChange={(e, cellId, rowId) =>
                      setUserDetails({
                        ...userDetails,
                        Individual: { ...userDetails.Individual, IndividualBirthDate: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Year of Registration:</label>
                  <input
                    type="text"
                    name="YearOfRegistration"
                    value={userDetails.Individual?.YearOfRegistration || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>
            <div>
              <hr className="my-4" />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">As per Scopus or SCI:</h2>
              <hr className="my-4" />
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">H-Index:</label>
                  <input
                    type="text"
                    name="IndividualHIndex"
                    value={userDetails.Individual?.IndividualHIndex || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Citations:</label>
                  <input
                    type="text"
                    name="IndividualCitations"
                    value={userDetails.Individual?.IndividualCitations || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Orchid ID:</label>
                  <input
                    type="text"
                    name="IndividualOrchidID"
                    value={userDetails.Individual?.IndividualOrchidID || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Researcher ID:</label>
                  <input
                    type="text"
                    name="IndividualResearcherID"
                    value={userDetails.Individual?.IndividualResearcherID || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>
            <div>
              <hr className="my-4" />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Use of ICT in Teaching:</h2>
              <div className="space-y-2">
                {['Smart Board', 'Power point Presentation', 'ICT Tools', 'E-Learning Tools', 'Online course', 'Others'].map((item) => (
                  <div key={item}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={item}
                        checked={userDetails.Individual?.IndividualICTTeaching?.includes(item) || false}
                        onChange={handleCheckboxChange}
                      />
                      <span>{item}</span>
                    </label>
                  </div>
                ))}
              </div>
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
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Basic Information</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Salutation:</span> {userDetails.Individual?.IndividualSalutation}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Name:</span> {userDetails.Individual?.IndividualName}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Mobile:</span> {userDetails.Individual?.IndividualMobile}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Teaching Status:</span> {userDetails.Individual?.IndividualTeachingStatus}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Designation:</span> {userDetails.Individual?.IndividualDesignation}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Faculty:</span> {userDetails.Individual?.IndividualFaculty}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Department:</span> {userDetails.Individual?.IndividualDepartment}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Qualified GATE Exam:</span> {userDetails.Individual?.IndividualGATEQualified}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Joining Date:</span> {userDetails.Individual?.IndividualJoiningDate}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Birth Date:</span> {userDetails.Individual?.IndividualBirthDate}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Year of Registration:</span> {userDetails.Individual?.YearOfRegistration}
                </p>
              </div>
            </div>
            <div>
              <hr className="my-4" />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">As per Scopus or SCI</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">H-Index:</span> {userDetails.Individual?.IndividualHIndex}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Citations:</span> {userDetails.Individual?.IndividualCitations}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Orchid ID:</span> {userDetails.Individual?.IndividualOrchidID}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Researcher ID:</span> {userDetails.Individual?.IndividualResearcherID}
                </p>
              </div>
            </div>
            <div>
              <hr className="my-4" />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Use of ICT Teaching</h2>
              <div className="space-y-2">
                {userDetails.Individual?.IndividualICTTeaching?.map((item, index) => (
                  <p key={index} className="text-gray-600">
                    <span className="font-semibold text-gray-800">{item}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
