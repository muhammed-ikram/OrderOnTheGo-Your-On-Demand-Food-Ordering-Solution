import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryProducts = () => {

  const navigate = useNavigate();

  const {category} = useParams();

  const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants();
      }, [])

    const fetchRestaurants = async() =>{
        await axios.get('http://localhost:6001/fetch-restaurants').then(
          (response)=>{
            setRestaurants(response.data.filter(restaurant=> restaurant.menu.includes(category)).slice(0, 4));
          }
        )
      }


  return (
    <div className="categoryProducts-page" style={{ maxWidth: 700, margin: '0 auto', paddingTop: 48 }}>
      <h2 style={{ color: '#8ab4f8', fontWeight: 700, marginBottom: 32, fontSize: '2rem' }}>Restaurants Serving {category}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 48 }}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="restaurant-card"
            style={{ display: 'flex', alignItems: 'center', background: '#23272a', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px #181a1b22', cursor: 'pointer' }}
            onClick={() => navigate(`/restaurant/${restaurant._id}`)}
          >
            <img src={restaurant.mainImg} alt={restaurant.title} style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', marginRight: 32 }} />
            <div>
              <h3 style={{ color: '#8ab4f8', margin: 0, fontWeight: 600 }}>{restaurant.title}</h3>
              <p style={{ color: '#b0b8c1', margin: '8px 0 0 0' }}>{restaurant.address}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default CategoryProducts