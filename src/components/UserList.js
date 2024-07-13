// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('https://65609c5083aba11d99d12eb3.mockapi.io/api/v1/users')
      .then(response => {
        setUsers(response.data);
        setResults(response.data); // Initialize results with all users
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setResults(users);
    } else {
      const fuse = new Fuse(users, {
        keys: ['first_name', 'last_name', 'vehicle'],
        threshold: 0.3, // Adjust this value for more or less strict matching
      });
      const searchResults = fuse.search(searchTerm).map(result => result.item);
      setResults(searchResults);
    }
  }, [searchTerm, users]);

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Country</th>
            <th>Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {results.map(user => (
            <tr key={user.id}>
              <td><img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} width="50" /></td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.country}</td>
              <td>{user.vehicle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
