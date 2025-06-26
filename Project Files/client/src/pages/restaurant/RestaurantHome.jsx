import React, { useEffect, useState } from 'react'
import '../../styles/RestaurantHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RestaurantHome = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [restaurant, setRestaurant] = useState('pending');
  const [itemsCount, setItemsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [restaurantData, setRestaurantData] = useState();

  useEffect(() => {
    fetchUserData();
    fetchRestaurantData();
    // eslint-disable-next-line
  }, []);

  const fetchUserData = async () => {
    await axios.get(`http://localhost:6001/fetch-user-details/${userId}`).then((response) => {
      setRestaurant(response.data);
    });
  };

  const fetchRestaurantData = async () => {
    await axios.get(`http://localhost:6001/fetch-restaurant-details/${userId}`).then((response) => {
      setRestaurantData(response.data);
      fetchItems(response.data._id);
      fetchOrders(response.data._id);
    });
  };

  const fetchItems = async (id) => {
    await axios.get('http://localhost:6001/fetch-items').then((response) => {
      setItemsCount(response.data.filter((item) => item.restaurantId === id).length);
    });
  };

  const fetchOrders = async (id) => {
    await axios.get('http://localhost:6001/fetch-orders').then((response) => {
      setOrdersCount(response.data.filter((item) => item.restaurantId === id).length);
    });
  };

  if (restaurant.approval === 'pending') {
    return (
      <div className="restaurantHome-page" style={{ maxWidth: 700, margin: '0 auto', paddingTop: 48 }}>
        <div style={{ background: '#23272a', borderRadius: 16, padding: 32, textAlign: 'center', color: '#e57373', fontWeight: 700 }}>
          <h3>Approval required!</h3>
          <p style={{ color: '#b0b8c1', fontWeight: 400 }}>You need to get approval from the admin to make this work. Please be patient.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurantHome-page" style={{ maxWidth: 700, margin: '0 auto', paddingTop: 48 }}>
      <h2 style={{ color: '#8ab4f8', fontWeight: 700, marginBottom: 32, fontSize: '2rem' }}>Restaurant Dashboard</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>Menu Items</h4>
          <p style={cardValueStyle}>{itemsCount}</p>
          <button style={cardBtnStyle} onClick={() => navigate('/restaurant-menu')}>View menu</button>
        </div>
        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>Orders</h4>
          <p style={cardValueStyle}>{ordersCount}</p>
          <button style={cardBtnStyle} onClick={() => navigate('/restaurant-orders')}>View orders</button>
        </div>
        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>Add New Item</h4>
          <button style={cardBtnStyle} onClick={() => navigate('/new-product')}>Add now</button>
        </div>
      </div>
    </div>
  );
};

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

export default RestaurantHome