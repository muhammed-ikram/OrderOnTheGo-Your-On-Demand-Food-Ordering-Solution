import React, { useContext, useEffect, useState } from 'react';
import '../../styles/Cart.css';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { fetchCartCount } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const fetchCart = async () => {
    await axios.get('http://localhost:6001/fetch-cart').then((response) => {
      setCart(response.data.filter((item) => item.userId === userId));
    });
  };

  const removeItem = async (id) => {
    await axios.put('http://localhost:6001/remove-item', { id }).then(() => {
      fetchCart();
      fetchCartCount();
    });
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    if (cart) calculateTotalPrice();
    // eslint-disable-next-line
  }, [cart]);

  const calculateTotalPrice = () => {
    const price = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const discount = cart.reduce((sum, product) => sum + ((product.price * product.discount) / 100) * product.quantity, 0);
    setTotalPrice(price);
    setTotalDiscount(Math.floor(discount));
    setDeliveryCharges(price > 1000 || cart.length === 0 ? 0 : 50);
  };

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const placeOrder = async () => {
    if (cart.length > 0) {
      await axios
        .post('http://localhost:6001/place-cart-order', {
          userId,
          name,
          mobile,
          address,
          paymentMethod,
          orderDate: new Date(),
        })
        .then(() => {
          alert('Order placed!');
          setName('');
          setMobile('');
          setAddress('');
          setPaymentMethod('');
          setCart([]);
        });
    }
  };

  return (
    <div className="cartPage"> 
      <h2 style={{ color: '#8ab4f8', fontWeight: 700, marginBottom: 24 }}>Your Cart</h2>
      {cart.length === 0 ? (
        <p style={{ color: '#b0b8c1', textAlign: 'center', marginTop: 48 }}>No items in the cart.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
            {cart.map((item) => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', background: '#23272a', borderRadius: 12, padding: 16 }}>
                <img src={item.foodItemImg} alt={item.foodItemName} style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', marginRight: 18 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#f5f6fa', margin: 0 }}>{item.foodItemName}</h4>
                  <p style={{ color: '#b0b8c1', margin: '4px 0 0 0', fontSize: 14 }}>{item.restaurantName}</p>
                  <p style={{ color: '#8ab4f8', margin: '4px 0 0 0', fontSize: 15 }}>Qty: {item.quantity}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#8ab4f8', margin: 0, fontWeight: 600 }}>&#8377; {parseInt(item.price - (item.price * item.discount) / 100)}</p>
                  <button style={{ background: 'none', border: 'none', color: '#e57373', fontWeight: 700, cursor: 'pointer', marginTop: 8 }} onClick={() => removeItem(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#23272a', borderRadius: 12, padding: 20, marginBottom: 32 }}>
            <h4 style={{ color: '#8ab4f8', margin: 0, marginBottom: 12 }}>Summary</h4>
            <div style={{ color: '#b0b8c1', fontSize: 15, marginBottom: 8 }}>Total: &#8377; {totalPrice}</div>
            <div style={{ color: '#b0b8c1', fontSize: 15, marginBottom: 8 }}>Discount: <span style={{ color: '#7fd6b0' }}>-&#8377; {totalDiscount}</span></div>
            <div style={{ color: '#b0b8c1', fontSize: 15, marginBottom: 8 }}>Delivery: <span style={{ color: '#e57373' }}>+&#8377; {deliveryCharges}</span></div>
            <div style={{ color: '#8ab4f8', fontWeight: 600, fontSize: 17, marginTop: 8 }}>Final: &#8377; {totalPrice - totalDiscount + deliveryCharges}</div>
          </div>
          <div style={{ background: '#23272a', borderRadius: 12, padding: 20 }}>
            <h4 style={{ color: '#8ab4f8', margin: 0, marginBottom: 12 }}>Checkout</h4>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={inputStyle}>
              <option value="">Payment method</option>
              <option value="netbanking">Netbanking</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on delivery</option>
            </select>
            <button style={checkoutBtnStyle} onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  margin: '8px 0',
  padding: '10px 12px',
  borderRadius: 6,
  border: '1px solid #393e46',
  background: '#181a1b',
  color: '#f5f6fa',
  fontSize: 15,
};
const checkoutBtnStyle = {
  width: '100%',
  marginTop: 16,
  padding: '12px 0',
  borderRadius: 6,
  border: 'none',
  background: '#8ab4f8',
  color: '#181a1b',
  fontWeight: 700,
  fontSize: 16,
  cursor: 'pointer',
};

export default Cart;