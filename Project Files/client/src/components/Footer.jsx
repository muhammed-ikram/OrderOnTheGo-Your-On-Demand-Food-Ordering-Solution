import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footer-top">
        <img src="/food-delivery-logo.svg" alt="UrbanEats Food Delivery Logo" className="footer-logo" />
        <h4>@UrbanEats - Savor the City, One Bite at a Time.</h4>
      </div>
      <div className="footer-body">
        <ul>
          <li>Biriyani</li>
          <li>Pizza</li>
        </ul>
        <ul>
          <li>Beverages</li>
          <li>Burger</li>
        </ul>
        <ul>
          <li>Pulav's</li>
          <li>Rice bowls</li>
        </ul>
        <ul>
          <li>Fried Momo's</li>
          <li>Chicken</li>
        </ul>
        <ul>
          <li>Sandwich</li>
          <li>BBQ</li>
        </ul>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} urbaneats.com - All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer