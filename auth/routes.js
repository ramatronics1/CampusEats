const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Signup = require('../models/adminSchema'); 

const Dish = require('../models/adminSchema')
const multer = require('multer');
const {storage}=require('../cloudinary/cloudinary')
const upload = multer({storage });




route.post('/addNewDish', upload.multiple('image'), async (req, res) => {
  try {
    const newDish = new Dish({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.file ? req.file.path : '', // Assuming 'image' is the field name in the form
      ingredients: req.body.ingredients,
      isVegetarian: req.body.isVegetarian || false,
    });

    const savedDish = await newDish.save();
    res.json(savedDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
route.post('/login', async (req, res) => {
    

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

route.post('/signup', async (req, res) => {
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
