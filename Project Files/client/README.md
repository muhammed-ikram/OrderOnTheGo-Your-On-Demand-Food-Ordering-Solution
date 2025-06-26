# 🍽️ Food Ordering App (MERN Stack)

A full-stack food ordering web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project allows users to browse food items, add them to cart, and simulate an order process — demonstrating a modern food delivery system.

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Development Tools:** Nodemon
- **HTTP Client:** Axios

## 🚀 Features

- **User-Friendly Interface:** Clean and intuitive UI to explore and select food items
- **Shopping Cart:** Add items to cart with quantity management
- **Order Management:** Complete order placement and tracking simulation
- **RESTful API:** Robust backend APIs for seamless communication
- **Database Integration:** MongoDB for efficient data storage and retrieval
- **Responsive Design:** Works across different screen sizes and devices

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Internship-Demo/Food-Ordering-App-MERN
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Environment Configuration

Create a `.env` file in the `server` directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/food-ordering-app
PORT=5000
```

### 5. Start the Application

#### Start the Backend Server

```bash
cd server
nodemon index.js
```

The server will run on `http://localhost:5000`

#### Start the Frontend Client

```bash
cd client
npm start
```

The client will run on `http://localhost:3000`

## 📁 Project Structure

```
Food-Ordering-App-MERN/
├── .git/                   # Git repository
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Images, icons, static files
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main App component
│   │   ├── index.js        # React entry point
│   │   └── ...
│   ├── .gitignore
│   ├── package.json
│   └── ...
├── server/                 # Node.js backend
│   ├── models/             # MongoDB data models
│   ├── routes/             # API route definitions
│   ├── index.js            # Server entry point
│   └── ...
├── node_modules/           # Dependencies
├── package.json            # Root package configuration
├── package-lock.json      # Dependency lock file
├── README.md
└── ...
```

## 🔗 API Endpoints

### Food Items
- `GET /api/foods` - Get all food items
- `GET /api/foods/:id` - Get specific food item
- `POST /api/foods` - Add new food item (admin)

### Cart & Orders
- `POST /api/cart` - Add item to cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/orders` - Place an order
- `GET /api/orders/:userId` - Get user's orders

## 🎯 Usage

1. **Browse Menu:** Navigate through different food categories
2. **Add to Cart:** Select items and add them to your cart
3. **Review Cart:** Check selected items and quantities
4. **Place Order:** Complete the order process
5. **Order Confirmation:** Receive order confirmation and tracking details

## 🚧 Future Enhancements

- User authentication and authorization
- Payment gateway integration
- Real-time order tracking
- Admin dashboard for menu management
- User reviews and ratings
- Push notifications
- Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author
MUHAMMED IKRAM
## CONTRIBUTORS
MOHAMMAD SABEEL S A 

MOURYA AYYAPPA N

RAEESA TANWEER A

## 🙏 Acknowledgments

- Thanks to the MERN stack community for excellent documentation
- Inspiration from popular food delivery applications
- Open source libraries and tools used in this project

---

⭐ If you found this project helpful, please give it a star!
