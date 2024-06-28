import React, { useState } from 'react';

const UserForm = () => {
  const [userData, setUserData] = useState({
    user_id: '',
    name: '',
    email: '',
    password_hash: '',
    phone_number: '',
    date_of_birth: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('User added successfully!');
        // Optionally clear the form after successful submission
        setUserData({
          user_id: '',
          name: '',
          email: '',
          password_hash: '',
          phone_number: '',
          date_of_birth: '',
          gender: ''
        });
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input
          type="text"
          name="user_id"
          value={userData.user_id}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password Hash:
        <input
          type="password"
          name="password_hash"
          value={userData.password_hash}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          name="phone_number"
          value={userData.phone_number}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="date"
          name="date_of_birth"
          value={userData.date_of_birth}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Gender:
        <select
          name="gender"
          value={userData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
