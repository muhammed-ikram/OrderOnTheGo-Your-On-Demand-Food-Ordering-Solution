import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const featuredCategories = [
  {
    name: 'Biriyani',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-VXaTJIkc6rk02DU8r7r9zR-KaeWvH1oKA&usqp=CAU',
  },
  {
    name: 'Pizza',
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
  },
  {
    name: 'Noodles',
    img: 'https://www.licious.in/blog/wp-content/uploads/2022/12/Shutterstock_2176816723.jpg',
  },
];

const Home = () => {

  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants();
      }, [])

    const fetchRestaurants = async() =>{
        await axios.get('http://localhost:6001/fetch-restaurants').then(
          (response)=>{
            setRestaurants(response.data.slice(0, 3));
          }
        )
      }

  return (
    <div className="HomePage" style={{ maxWidth: 700, margin: '0 auto', paddingTop: 48 }}>
      <div className="company-header" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, justifyContent: 'center' }}>
        <img src="/food-delivery-logo.svg" alt="UrbanEats Food Delivery Logo" style={{ width: 48, height: 48, borderRadius: '50%', background: '#23272a', boxShadow: '0 2px 8px #0002', padding: 4 }} />
        <span style={{ color: '#8ab4f8', fontWeight: 800, fontSize: '2rem', letterSpacing: 1 }}>UrbanEats</span>
      </div>
      <h1 style={{ color: '#8ab4f8', fontWeight: 700, marginBottom: 32, fontSize: '2.2rem' }}>Find Your Next Craving</h1>
      <div style={{ display: 'flex', gap: 32, marginBottom: 48, justifyContent: 'center' }}>
        {featuredCategories.map((cat) => (
          <div
            key={cat.name}
            className="home-category-card"
            style={{ minWidth: 160, cursor: 'pointer' }}
            onClick={() => navigate(`/category/${cat.name}`)}
          >
            <img src={cat.img} alt={cat.name} style={{ width: 120, height: 120, borderRadius: '50%' }} />
            <h5 style={{ marginTop: 12 }}>{cat.name}</h5>
          </div>
        ))}
      </div>
      <h2 style={{ color: '#b0b8c1', fontWeight: 600, marginBottom: 24, fontSize: '1.4rem' }}>Spotlighted Kitchens</h2>
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

export default Home