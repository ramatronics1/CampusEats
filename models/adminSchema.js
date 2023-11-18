const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});


const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: [String],
    required: true,
  },
  ingredients: {
    type: [String], 
    required: true,
  }
  
});


const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;


const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;



const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
