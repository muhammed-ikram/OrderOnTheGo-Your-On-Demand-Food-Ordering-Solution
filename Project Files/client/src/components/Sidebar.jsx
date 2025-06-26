import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUtensils, FaShoppingCart, FaUser, FaUserShield, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ open, onClose }) => {
  const userType = localStorage.getItem('userType');
  return (
    <div className={`sidebar-drawer${open ? ' open' : ''}`}> 
      <button className="sidebar-drawer-close" onClick={onClose}><FaTimes size={22} /></button>
      <h2 style={{ color: '#8ab4f8', marginBottom: 32, fontWeight: 700 }}>UrbanEats</h2>
      <NavLink to="/" className="sidebar-link" onClick={onClose}><FaHome /> <span>Dashboard</span></NavLink>
      <NavLink to="/category/Biriyani" className="sidebar-link" onClick={onClose}><FaUtensils /> <span>Explore</span></NavLink>
      <NavLink to="/cart" className="sidebar-link" onClick={onClose}><FaShoppingCart /> <span>Basket</span></NavLink>
      <NavLink to="/profile" className="sidebar-link" onClick={onClose}><FaUser /> <span>Account</span></NavLink>
      {userType === 'admin' && <NavLink to="/admin" className="sidebar-link" onClick={onClose}><FaUserShield /> <span>Admin Panel</span></NavLink>}
      {!userType && <NavLink to="/auth" className="sidebar-link" onClick={onClose}><FaSignInAlt /> <span>Sign In</span></NavLink>}
    </div>
  );
};

export const SidebarDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="sidebar-menu-btn" onClick={() => setOpen(true)}><FaBars size={24} /></button>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className={open ? 'sidebar-overlay' : ''} onClick={() => setOpen(false)} />
      <div style={{ flex: 1 }}>{children}</div>
    </>
  );
};

export default Sidebar; 