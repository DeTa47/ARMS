import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:8000/getAllUsers', {}, {
            headers: { 'Content-Type': 'application/json' },
            
        }).then(response => {
            console.log("From admin dashboard");
            setUsers(response.data);
        }).catch(error => {
            console.error('Error fetching users:', error);
        });
    }, []);

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:8000/deleteUser/${userId}`, {
           
        }).then(() => {
            setUsers(users.filter(user => user._id !== userId));
        }).catch(error => {
            console.error('Error deleting user:', error);
        });
    };

    const handleRowClick = (userId) => {
        setAuth(prev => ({ ...prev, data: { ...prev.data, userid: userId } }));
        navigate('/dashboard', { replace: true });
    };

    if (!users) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Customer Type</th>
                                <th className="border border-gray-300 px-4 py-2">Email Verified</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleRowClick(user._id)}>
                                    <td className="border border-gray-300 px-4 py-2">{user.Email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.CustomerType}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.EmailVerification ? 'Yes' : 'No'}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.Status}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleDelete(user._id); }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}