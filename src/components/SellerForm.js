import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #1a5fc8;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #2575fc;
  cursor: pointer;
  text-decoration: underline;
`;

const SellerAuth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    company_name: '',
    company_address_id: '',
    registration_date: '',
    status: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await axios.post('http://localhost:5000/api/sellers/register', formData);
        alert('Seller registered successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/sellers/login', {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('sellerToken', response.data.token);
        alert('Logged in successfully!');
      }
      navigate('/sellerportal');
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred');
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Container>
      <Title>{isSignUp ? 'Seller Sign Up' : 'Seller Sign In'}</Title>
      <Form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="company_address_id"
              placeholder="Company Address ID"
              value={formData.company_address_id}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="registration_date"
              placeholder="Registration Date"
              value={formData.registration_date}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </>
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
      </Form>
      <ToggleButton onClick={toggleAuthMode}>
        {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
      </ToggleButton>
    </Container>
  );
};

export default SellerAuth;