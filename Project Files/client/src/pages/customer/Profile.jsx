import React, { useContext, useEffect, useState } from 'react'
import '../../styles/Profile.css'
import { GeneralContext } from '../../context/GeneralContext'
import axios from 'axios'

const Profile = () => {

  const {logout} = useContext(GeneralContext);

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    fetchOrders();
  },[])

  const fetchOrders = async() =>{
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrders(response.data.filter(order=> order.userId === userId).slice(0, 5));
      }
    )
  }

  const cancelOrder = async(id) =>{
    await axios.put('http://localhost:6001/cancel-order', {id}).then(
      (response)=>{
        alert('order cancelled!!');
        fetchOrders();
      }
    )
  }

  return ( 
    <div className="profilePage" style={{ maxWidth: 700, margin: '0 auto', paddingTop: 48 }}>
      <div style={{ background: '#23272a', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 2px 12px #181a1b22' }}>
        <h2 style={{ color: '#8ab4f8', fontWeight: 700, marginBottom: 16 }}>My Profile</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <div><span style={{ color: '#b0b8c1', fontWeight: 500 }}>Username:</span> <span style={{ color: '#f5f6fa' }}>{username}</span></div>
          <div><span style={{ color: '#b0b8c1', fontWeight: 500 }}>Email:</span> <span style={{ color: '#f5f6fa' }}>{email}</span></div>
          <div><span style={{ color: '#b0b8c1', fontWeight: 500 }}>Orders:</span> <span style={{ color: '#f5f6fa' }}>{orders.length}</span></div>
        </div>
        <button style={logoutBtnStyle} onClick={logout}>Logout</button>
      </div>
      <div style={{ background: '#23272a', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px #181a1b22' }}>
        <h3 style={{ color: '#8ab4f8', fontWeight: 600, marginBottom: 24 }}>Recent Orders</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {orders.length === 0 ? (
            <p style={{ color: '#b0b8c1' }}>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} style={{ display: 'flex', alignItems: 'center', background: '#181a1b', borderRadius: 12, padding: 18 }}>
                <img src={order.foodItemImg} alt={order.foodItemName} style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', marginRight: 18 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#f5f6fa', margin: 0 }}>{order.foodItemName}</h4>
                  <p style={{ color: '#b0b8c1', margin: '4px 0 0 0', fontSize: 14 }}>{order.restaurantName}</p>
                  <p style={{ color: '#8ab4f8', margin: '4px 0 0 0', fontSize: 15 }}>Qty: {order.quantity}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#8ab4f8', margin: 0, fontWeight: 600 }}>&#8377; {parseInt(order.price - (order.price * order.discount) / 100) * order.quantity}</p>
                  <p style={{ color: '#b0b8c1', margin: 0, fontSize: 13 }}>{order.orderDate.slice(0, 10)}</p>
                  <p style={{ color: '#b0b8c1', margin: 0, fontSize: 13 }}>{order.orderStatus}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const logoutBtnStyle = {
  background: '#e57373',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 32px',
  fontWeight: 700,
  fontSize: 16,
  marginTop: 12,
  cursor: 'pointer',
};

export default Profile