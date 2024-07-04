import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import LogoImg from './assets/login-image.png';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupForm = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  width: 100%;
  position: relative;
  background: linear-gradient(
    to right, 
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.8)
  );
  @media (max-width: 768px) {
    max-width: 300px;
    padding: 20px;
  }
  @media (max-width: 480px) {
    max-width: 250px;
    padding: 15px;
  }
`;


const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #333;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
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

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const moveLeftRight = keyframes`
  0% {
    transform: translateX(-30px);
  }
  50% {
    transform: translateX(30px);
  }
  100% {
    transform: translateX(-30px);
  }
`;

const Button = styled.button`
  padding: 10px;
  background: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #1a5fc8;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
  color: #2575fc;
`;

const Logo = styled.img`
  width: 80px;
  margin: 0 auto 20px;
  display: block;
  animation: ${moveLeftRight} 2s infinite;
`;

const AuthPopup = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    date_of_birth: '',
    gender: ''
  });

  const getMinDOB = () => {
    const today = new Date();
    const minDOB = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
    return minDOB.toISOString().split('T')[0]; 
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignUp) {
        response = await axios.post('http://localhost:5000/api/users/signup', formData);
        console.log('Sign up response:', response.data);
        alert('User created successfully!');
      } else {
        response = await axios.post('http://localhost:5000/api/users/signin', {
          email: formData.email,
          password: formData.password
        });
        console.log('Sign in response:', response.data);
        
        if (response.data && response.data.user) {
          const { id, name, email, gender, phone_number, date_of_birth } = response.data.user;
          
          const userData = { 
            id, 
            name, 
            email, 
            gender, 
            phone_number, 
            date_of_birth 
          };
          
          console.log('User data to be stored:', userData);
          
          localStorage.setItem('user', JSON.stringify(userData));
          
          console.log('Data stored in localStorage:', localStorage.getItem('user'));
          
          alert('Signed in successfully!');
        } else {
          console.error('Unexpected response structure:', response.data);
          alert('Unexpected response from server');
        }
      }
      onClose();
    } catch (error) {
      console.error('Error during authentication:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      alert(isSignUp ? 'Error creating user' : 'Error signing in');
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone_number: '',
      date_of_birth: '',
      gender: ''
    });
  };

  return (
    <Overlay>
      <PopupForm >
        <CloseButton onClick={onClose} />
        <Logo src={LogoImg} alt="Auth Logo" />
        <Title>{isSignUp ? 'Create Your Account' : 'Sign In'}</Title>
        <Form className="login-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
          {isSignUp && (
            <>
              <Input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              <Input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
        required
        min={getMinDOB()}
      />
              
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </>
          )}
          <Button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
        </Form>
        <ToggleText onClick={toggleMode}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </ToggleText>
      </PopupForm>
    </Overlay>
  );
};

export default AuthPopup;