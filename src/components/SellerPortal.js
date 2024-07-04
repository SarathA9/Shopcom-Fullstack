import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
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

const SellerPortal = () => {
  const [sellerData, setSellerData] = useState({
    name: '',
    email: '',
    phone_number: '',
    company_name: '',
    status: ''
  });

  const [products, setProducts] = useState([]);
  const [productFields, setProductFields] = useState({
    product_name: '',
    description: '',
    price: '',
    category_id: '',
    brand: '',
    quantity: '',
    status: ''
  });

  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const token = localStorage.getItem('sellerToken');
        if (!token) {
          navigate('/seller-auth');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/sellers/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSellerData(response.data);
        fetchProducts(token);
      } catch (error) {
        console.error('Error fetching seller data:', error);
        navigate('/seller-auth');
      }
    };

    fetchSellerData();
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/sellers/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSellerUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('sellerToken');
      await axios.put('http://localhost:5000/api/sellers/update', sellerData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Seller information updated successfully!');
    } catch (error) {
      console.error('Error updating seller information:', error);
      alert('Error updating seller information');
    }
  };

  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    setProductFields({ ...productFields, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('sellerToken');
      const formData = new FormData();
      Object.keys(productFields).forEach(key => {
        formData.append(key, productFields[key]);
      });
      if (productImage) {
        formData.append('image', productImage);
      }

      await axios.post('http://localhost:5000/api/sellers/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Product added successfully!');
      setProductFields({
        product_name: '',
        description: '',
        price: '',
        category_id: '',
        brand: '',
        quantity: '',
        status: ''
      });
      setProductImage(null);
      setImagePreview('');
      fetchProducts(token);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  return (
    <Container>
      <Title>Seller Portal</Title>

      <Form onSubmit={handleSellerUpdate}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={sellerData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={sellerData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={sellerData.phone_number}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={sellerData.company_name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="status"
          placeholder="Status"
          value={sellerData.status}
          onChange={handleChange}
          required
        />
        <Button type="submit">Update Seller Information</Button>
      </Form>

      <Form onSubmit={handleProductSubmit}>
        <Input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={productFields.product_name}
          onChange={handleProductChange}
          required
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={productFields.description}
          onChange={handleProductChange}
          required
        />
        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={productFields.price}
          onChange={handleProductChange}
          required
        />
        <Input
          type="number"
          name="category_id"
          placeholder="Category ID"
          value={productFields.category_id}
          onChange={handleProductChange}
          required
        />
        <Input
          type="text"
          name="brand"
          placeholder="Brand"
          value={productFields.brand}
          onChange={handleProductChange}
          required
        />
        <Input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={productFields.quantity}
          onChange={handleProductChange}
          required
        />
        <Input
          type="text"
          name="status"
          placeholder="Status"
          value={productFields.status}
          onChange={handleProductChange}
          required
        />
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Product preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        <Button type="submit">Add Product</Button>
      </Form>

      <h3>Your Products</h3>
      <ul>
        {products.map(product => (
          <li key={product.product_id}>{product.product_name}</li>
        ))}
      </ul>
    </Container>
  );
};

export default SellerPortal;