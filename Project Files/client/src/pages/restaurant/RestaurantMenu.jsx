import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [restaurant, setRestaurant] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchRestaurant();
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const fetchRestaurant = async () => {
    await axios.get(`http://localhost:6001/fetch-restaurant-details/${userId}`).then((response) => {
      setRestaurant(response.data);
    });
  };
  const fetchItems = async () => {
    await axios.get(`http://localhost:6001/fetch-items`).then((response) => {
      setItems(response.data);
    });
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    await axios.delete(`http://localhost:6001/delete-product/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  return (
    <div className="restaurantMenu-page" style={{ maxWidth: 700, margin: '0 auto', paddingTop: 48 }}>
      <h2 style={{ color: '#8ab4f8', fontWeight: 700, marginBottom: 32, fontSize: '2rem' }}>Dishes & Offerings</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {items.filter((item) => item.restaurantId === (restaurant && restaurant._id)).map((item) => (
          <div key={item._id} style={{ display: 'flex', alignItems: 'center', background: '#23272a', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px #181a1b22' }}>
            <img src={item.itemImg} alt={item.title} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', marginRight: 32 }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#8ab4f8', margin: 0, fontWeight: 600 }}>{item.title}</h3>
              <p style={{ color: '#b0b8c1', margin: '8px 0 0 0' }}>{item.description}</p>
              <p style={{ color: '#8ab4f8', margin: '8px 0 0 0', fontWeight: 600 }}>&#8377; {item.price} <span style={{ color: '#7fd6b0', fontWeight: 400, fontSize: 15 }}>({item.discount}% off)</span></p>
            </div>
            <button style={editBtnStyle} onClick={() => navigate(`/update-product/${item._id}`)}>Edit</button>
            <button style={deleteBtnStyle} onClick={() => deleteItem(item._id)} title="Delete">
              <FaTrash size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const editBtnStyle = {
  background: '#8ab4f8',
  color: '#181a1b',
  border: 'none',
  borderRadius: 6,
  padding: '10px 24px',
  fontWeight: 700,
  fontSize: 15,
  marginLeft: 24,
  cursor: 'pointer',
};

const deleteBtnStyle = {
  background: 'transparent',
  color: '#e57373',
  border: 'none',
  borderRadius: 6,
  padding: '10px',
  marginLeft: 12,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default RestaurantMenu;