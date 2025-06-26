import React, { useEffect, useState } from 'react'
import '../../styles/AllOrders.css'
import axios from 'axios';

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  
  const [updateStatus, setUpdateStatus] = useState('');
  const username = localStorage.getItem('username')


  useEffect(()=>{

      fetchOrders();

  },[])


  const fetchOrders = async() =>{
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrders(response.data.filter(order=> order.restaurantName === username).slice(0, 10));
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

  const updateOrderStatus = async(id) =>{
    await axios.put('http://localhost:6001/update-order-status', {id, updateStatus}).then(
      (response)=>{
        alert("Order status updated!!");
        setUpdateStatus('');
        fetchOrders();
      }
    ).catch((err)=>{
      alert("Order update failed!!");
    })
  }

  return (
    <div className="restaurantOrders-page" style={{ maxWidth: 700, margin: '0 auto', paddingTop: 48 }}>
      <h2 style={{ color: '#8ab4f8', fontWeight: 700, marginBottom: 32, fontSize: '2rem' }}>Latest Orders</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {orders.length === 0 ? (
          <p style={{ color: '#b0b8c1' }}>No orders have been placed yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={{ display: 'flex', alignItems: 'center', background: '#23272a', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px #181a1b22' }}>
              <img src={order.foodItemImg} alt={order.foodItemName} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', marginRight: 32 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#8ab4f8', margin: 0, fontWeight: 600 }}>{order.foodItemName}</h3>
                <p style={{ color: '#b0b8c1', margin: '8px 0 0 0' }}>Qty: {order.quantity}</p>
                <p style={{ color: '#8ab4f8', margin: '8px 0 0 0', fontWeight: 600 }}>&#8377; {parseInt(order.price - (order.price*order.discount)/100) * order.quantity}</p>
                <p style={{ color: '#b0b8c1', margin: '8px 0 0 0', fontSize: 13 }}>{order.orderDate.slice(0,10)}</p>
                <p style={{ color: '#b0b8c1', margin: '8px 0 0 0', fontSize: 13 }}>Status: {order.orderStatus}</p>
                {order.orderStatus === 'order placed' || order.orderStatus === 'In-transit' ? (
                  <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                    <select
                      style={selectStyle}
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    >
                      <option value="">Update status</option>
                      <option value="order placed">Order Accepted</option>
                      <option value="In-transit">In-transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <button style={updateBtnStyle} onClick={() => updateOrderStatus(order._id)}>
                      Update
                    </button>
                    <button style={cancelBtnStyle} onClick={() => cancelOrder(order._id)}>
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const selectStyle = {
  background: '#181a1b',
  color: '#f5f6fa',
  border: '1px solid #393e46',
  borderRadius: 6,
  padding: '8px 12px',
  fontSize: 15,
};
const updateBtnStyle = {
  background: '#8ab4f8',
  color: '#181a1b',
  border: 'none',
  borderRadius: 6,
  padding: '8px 18px',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer',
};
const cancelBtnStyle = {
  background: '#e57373',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '8px 18px',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer',
};

export default RestaurantOrders