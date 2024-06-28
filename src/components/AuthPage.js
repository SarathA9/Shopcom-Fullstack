import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import LogoImg from './assets/login-image.png';
import BG from './assets/bg.png';
import BGSmall from './assets/bg-small.png';
import './style.css';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${BG});
  background-position: center;
  background-size: cover;
  overflow: hidden;
  padding:15px;

  @media (max-width: 768px) {
    background: url(${BGSmall});
    background-position: center;
    background-size: cover;
  }
`;
const FormWrapper = styled.div`
background: linear-gradient(
  to right, 
  rgba(255, 255, 255, 0.2),
  rgba(255, 255, 255, 0.2)

);  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 40px;
  overflow: hidden;
  max-width: 400px;
  width: 100%;
  text-align: center;
  animation: ${keyframes`
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `} 0.5s ease-in-out;

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 250px;
  }
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2575fc;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: #2575fc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: #6a11cb;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const StyledLink = styled.a`
  display: block;
  margin-top: 20px;
  color: #2575fc;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
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

const Image = styled.img`
  max-width: 80px;
  height: auto;
  border-radius: 15px;
  margin-bottom: 20px;
  animation: ${moveLeftRight} 2s infinite;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  background-color: white;
`;

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    date_of_birth: '',
    gender: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignUp) {
        response = await axios.post('http://localhost:5000/api/users/signup', formData);
        console.log(response.data);
        alert('User created successfully!');
      } else {
        response = await axios.post('http://localhost:5000/api/users/signin', {
          email: formData.email,
          password: formData.password
        });
        console.log(response.data);
        alert('Signed in successfully!');
      }
      // Here you might want to save the token, redirect the user, etc.
    } catch (error) {
      console.error(error);
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
    <Background>
      <FormWrapper className='login-form'>
        <Image src={LogoImg} alt="Auth" />
        <Title>{isSignUp ? 'Create Your Account' : 'Sign In'}</Title>
        <form onSubmit={handleSubmit} className='login-form'>
          {isSignUp && (
            <Input
              className='login-form'
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <Input
            className='login-form'
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            className='login-form'
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
                className='login-form'
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <Input
                className='login-form'
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
              <Select
                className='login-form'
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </>
          )}
          <Button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
        </form>
        <StyledLink onClick={toggleMode}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </StyledLink>
      </FormWrapper>
    </Background>
  );
};

export default AuthPage;
