require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;


const sampleData = [
  {
    title: "Cetirizine 45mg Film-coated",
    description: "Cetirizine hydrochloride is the active ingredient of Cetirizine 10 mg Tablets.",
    price: 25.0,
    image: "../assets/products/product1.jpg",
    reviews: 3,
    rating: 4
  },
  {
    title: "Ibuprofen 500mg Capsule",
    description: "Ibuprofen is used to relieve pain from various conditions such as headache, dental pain, menstrual cramps, muscle aches, or arthritis. It is also used to reduce fever and to relieve minor aches and pain due to the common cold or flu.",
    price: 32.0,
    image: "../assets/products/product2.jpg",
    reviews: 20,
    rating: 5
  },
  {
    title: "EllaOne Film-Coated tablet",
    description: "ellaOne is for occasional use only. It should in no instance replace a regular contraceptive method. In any case, women should be advised to adopt a regular method of contraception.",
    price: 49.0,
    image: "../assets/products/product3.jpg",
    reviews: 25,
    rating: 3
  },
  {
    title: "Tablet 100 PLUS",
    description: "This combination product contains a mineral (iron) along with 3 vitamins (vitamin C, vitamin B12, and folic acid). It is used to treat or prevent a lack of these nutrients which may occur in certain health conditions (e.g., anemia, pregnancy, poor diet, surgery recovery).",
    price: 28.9,
    image: "../assets/products/product4.jpg",
    reviews: 30,
    rating: 4
  },
  {
    title: "Ibuprofen 250mg capsules x18",
    description: "Ibuprofen is used to relieve pain from various conditions such as headache, dental pain, menstrual cramps, muscle aches, or arthritis. It is also used to reduce fever and to relieve minor aches and pain due to the common cold or flu.",
    price: 17.5,
    image: "../assets/products/product5.jpg",
    reviews: 100,
    rating: 5
  },
  {
    title: "Cetirizine 25mg Film-coated Tablets",
    description: "Cetirizine hydrochloride is the active ingredient of Cetirizine 10 mg Tablets.",
    price: 34.9,
    image: "../assets/products/product6.jpg",
    reviews: 23,
    rating: 3
  },
  {
    title: "Hand Creams for Dry, Sensitive Skin",
    description: "You may have used Aquaphor's Advanced Therapy Healing Ointment for your dry lips or cuticles before, and while it's great for curbing chapped lips, we especially love this miracle treatment for our cracked hands. Its thick texture repairs, protects, and soothes all skin types, including sensitive and eczema-prone (thanks to the fragrance-free formula).",
    price: 56.9,
    image: "../assets/products/product7.jpg",
    reviews: 45,
    rating: 3
  },
  {
    title: "Film-coated tablet 250 mg 30 pieces",
    description: "Bath & Body Works' Rose Hand Cream is made with moisturizing shea butter and vitamin E to hydrate skin. This hand treatment not only benefits dry hands but leaves them smelling like an expensive bouquet of roses (for only $7).",
    price: 19.8,
    image: "../assets/products/product8.jpg",
    reviews: 23,
    rating: 3
  }
];

const Product = require('./models/product');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Kết nối MongoDB thành công');
  // await Product.insertMany(sampleData);
  // console.log('Thêm sample data thành công');
}).catch(err => {
  console.error('Lỗi kết nối MongoDB:', err);
});

// Route test
app.get('/', (req, res) => {
  res.send('Backend đang chạy!');
});

// Import routes
const userRoutes = require('./routers/userRoutes');
const productRoutes = require('./routers/productRouter');
const feedbackRoutes = require('./routers/feedbackRoutes');

// Sử dụng routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
