import React, { useState } from 'react';
import '../styles/Restaurants.css';
import { FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa';

const mockRestaurants = [
  {
    id: 1,
    title: 'Chicken Biryani',
    desc: 'Delicious spicy biryani with tender chicken pieces.',
    img: 'https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg',
    rating: 4.2,
  },
  {
    id: 2,
    title: 'Paneer Tikka',
    desc: 'Grilled paneer cubes marinated in spices.',
    img: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/12/Paneer-Tikka-1.jpg',
    rating: 4.5,
  },
  {
    id: 3,
    title: 'Veg Noodles',
    desc: 'Stir-fried noodles with fresh vegetables.',
    img: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/05/veg-noodles-recipe.jpg',
    rating: 4.0,
  },
  {
    id: 4,
    title: 'Chocolate Shake',
    desc: 'Rich and creamy chocolate shake.',
    img: 'https://www.cookwithmanali.com/wp-content/uploads/2021/06/Chocolate-Milkshake-500x500.jpg',
    rating: 4.7,
  },
  {
    id: 5,
    title: 'Masala Dosa',
    desc: 'Crispy dosa stuffed with spicy potato filling.',
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/01/masala-dosa-recipe-1.jpg',
    rating: 4.3,
  },
];

const Restaurants = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (id) => {
    // Placeholder for add to cart logic
    alert('Added to cart!');
  };

  return (
    <div className="restaurants-container">
      <div className="restaurants-filter">
        <h4>Filters</h4>
        <div className="restaurant-filters-body">
          <div className="filter-sort">
            <h6>Sort By</h6>
            <div className="filter-sort-body sub-filter-body">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio1" />
                <label className="form-check-label" htmlFor="filter-sort-radio1" >
                  Popularity
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" />
                <label className="form-check-label" htmlFor="filter-sort-radio4">
                  Rating
                </label>
              </div>
            </div>
          </div>
          <div className="filter-categories">
            <h6>Categories</h6>
            <div className="filter-categories-body sub-filter-body">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="filter-category-check-1" />
                <label className="form-check-label" htmlFor="filter-category-check-1">
                  South Indian
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="filter-category-check-2" />
                <label className="form-check-label" htmlFor="filter-category-check-2">
                  North Indian
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="filter-category-check-3" />
                <label className="form-check-label" htmlFor="filter-category-check-3">
                  Chinese
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="filter-category-check-4" />
                <label className="form-check-label" htmlFor="filter-category-check-4">
                  Beverages
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="filter-category-check-5" />
                <label className="form-check-label" htmlFor="filter-category-check-5">
                  Ice Cream
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Tiffins
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="restaurants-body">
        <h3>All Dishes</h3>
        <div className="restaurants">
          {mockRestaurants.map((item) => (
            <div className="restaurant-item" key={item.id}>
              <div className="restaurant">
                <span
                  className={`favorite${favorites.includes(item.id) ? ' favorited' : ''}`}
                  onClick={() => toggleFavorite(item.id)}
                  title={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorites.includes(item.id) ? <FaHeart /> : <FaRegHeart />}
                </span>
                <img src={item.img} alt={item.title} />
                <div className="restaurant-data">
                  <h6>{item.title}</h6>
                  <p>{item.desc}</p>
                  <h5>Rating: <b>{item.rating}/5</b></h5>
                </div>
                <button
                  className="quick-add"
                  onClick={() => handleAddToCart(item.id)}
                  title="Add to cart"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;