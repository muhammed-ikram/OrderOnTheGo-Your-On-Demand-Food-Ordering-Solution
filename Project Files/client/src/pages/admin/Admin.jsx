import React, { useEffect, useState } from 'react'
import '../../styles/Admin.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Admin = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(()=>{
    fetchUsers();
    fetchRestaurants();
    fetchOrders();
  }, [])

  const fetchUsers = async() =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response)=>{
        setUsers(response.data);
        
      }
    )
  }

  const fetchRestaurants = async() =>{
    await axios.get('http://localhost:6001/fetch-restaurants').then(
      (response)=>{
        setRestaurants(response.data);
        
      }
    )
  }

  const fetchOrders = async() =>{
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrdersCount(response.data.length);
        
      }
    )
  }

  return (
    <div className="admin-page" style={{ maxWidth: 700, margin: '0 auto', paddingTop: 48 }}>
      <h2 style={{ color: '#8ab4f8', fontWeight: 700, marginBottom: 32, fontSize: '2rem' }}>Admin Dashboard</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>Total Users</h4>
          <p style={cardValueStyle}>{users.length - 1}</p>
          <button style={cardBtnStyle} onClick={() => navigate('/all-users')}>View all users</button>
        </div>
        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>Total Restaurants</h4>
          <p style={cardValueStyle}>{restaurants.length}</p>
          <button style={cardBtnStyle} onClick={() => navigate('/all-restaurants')}>View all restaurants</button>
        </div>
        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>Total Orders</h4>
          <p style={cardValueStyle}>{ordersCount}</p>
          <button style={cardBtnStyle} onClick={() => navigate('/all-orders')}>View all orders</button>
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  background: '#23272a',
  borderRadius: 16,
  padding: 32,
  boxShadow: '0 2px 12px #181a1b22',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const cardTitleStyle = {
  color: '#b0b8c1',
  fontWeight: 600,
  marginBottom: 8,
};
const cardValueStyle = {
  color: '#8ab4f8',
  fontWeight: 700,
  fontSize: 32,
  margin: '8px 0 16px 0',
};
const cardBtnStyle = {
  background: '#8ab4f8',
  color: '#181a1b',
  border: 'none',
  borderRadius: 6,
  padding: '10px 32px',
  fontWeight: 700,
  fontSize: 16,
  marginTop: 12,
  cursor: 'pointer',
};

export default Admin