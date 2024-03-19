const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Ensure the email is stored in lowercase
        trim: true, // Remove whitespace from both ends of a string
    },
    password: {
        type: String,
        required: true,
    },
});

// static register method
userSchema.statics.register = async function (name, email, password) {
    // check name, email, and password existence
    if (!name || !email || !password) {
        throw Error("All fields must be filled");
    }

    // Validate name
    if (!name.trim().length) {
        throw Error("Name is required");
    }

    // check email validation
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    //check password strength
    if (!validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        throw Error("Password is weak");
    }

    const exists = await this.findOne({ email });
    if (exists) { throw Error("Email already in use"); }

    // hash the password before saving to database
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ name, email, password: encryptedPassword });

    return user;
}

// static login method
userSchema.statics.login = async function (email, password) {
    // check email and password existence
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    // check email validation
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    const user = await this.findOne({ email });
    if (!user) { throw Error("Incorrect Email, Doesn't exist"); }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) { throw Error("Incorrect Password"); }

    return user;
}

module.exports = mongoose.model('User', userSchema);
