const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Review, Dish, Signup } = require('../models/adminSchema');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

route.post('/addNewDish', upload.array('image'), async (req, res) => {
  const imageFiles = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  try {
    const { name, description, price, category, ingredients } = req.body;

    const newDish = new Dish({
      name: name,
      description: description,
      price: price,
      category: category,
      imageUrl: imageFiles,
      ingredients: ingredients, // Corrected assignment
    });

    console.log(newDish);

    await newDish.save();

    res.status(201).json({ message: 'Dish added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 route.get('/displayDishes', async (req, res) => {
    try {
      const dishes = await Dish.find();
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
route.get('/adminLogin', async (req, res) => {
  

    const { email, password } = req.body;

    const saltRounds = 10;
    try {
        const user = await Signup.findOne({ email });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                
                console.log("logged in")

                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in' + error });
    }
});

route.post('/adminSignup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new Signup({
            email: email,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error signing up' + error });
    }
});

module.exports = route;
