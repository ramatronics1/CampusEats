const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Add any necessary password hashing or other middleware here...

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
