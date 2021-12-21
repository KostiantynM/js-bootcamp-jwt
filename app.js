require("dotenv").config(); // inject env vars from .env into process.env
require("./config/db").connect(); // connect to the DB
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const auth = require("./middleware/auth");
const validator = require('./middleware/validator');
const { richValidationError, errorHandler } = require('./middleware/error');
const schema = require('./schema');
const { ConflictError, UnauthorizedError } = require("./error");

const app = express();

// register base middlewares

app.use(express.json()); // to parse incoming requests with JSON payloads

//register api routes

app.post("/signup", validator(schema.signup), async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    // check if given email is using
    const isEmailUsed = await User.findOne({ email });

    if (isEmailUsed) {
      throw new ConflictError({
        userMessage: "User Already Exist. Please Login",
        data: {
          email
        }
      })
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Store user into DB
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      {
        userId: user._id,
        email
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    await user.save();
    const newUser = user.toObject();
    // respond with new user
    res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      password: newUser.password,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post("/signin", validator(schema.signin), async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate if user exist in database
    const user = await User.findOne({ email });

    // validate user password
    const isPswValid = !(await bcrypt.compare(password, user.password));
    if (!user || !isPswValid) {
      throw new UnauthorizedError({
        userMessage: "Invalid Credentials",
        data: {
          email,
          password
        }
      })
    }

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // user
    return res.status(200).json({token});
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// middleware for error handling should be applied at the end
app.use(richValidationError, errorHandler);

module.exports = app;