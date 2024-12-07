// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        alert('Failed to fetch users');
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;