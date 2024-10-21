const express = require('express')
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const dotenv = require('dotenv')
dotenv.config(); 
const app = express();

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI; 

app.get('/', (req, res) => {
    res.send('Hello from the API, Updated')
})

//create api
app.post("/api/products", async (req, res) => {
  try {
    // Save data to the database using the request body
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//read api

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });