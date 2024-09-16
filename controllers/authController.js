//========controller for sign-up/ register a new user======

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

const register = async (req, res, next) => {
  try {
    const { email, password, repeatPassword } = req.body;

    if (!email || !password || password !== repeatPassword) {
      throw customError("Invalid input data", 400);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "3d",
    });

    res.status(200).json({
      id: user._id,
      token,
    });
  } catch (error) {
    handleRegistrationError(error, next);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw customError("Invalid input data", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw customError("User does not exist", 400);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw customError("Wrong Password", 400);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "3d",
    });

    res.status(200).json({
      token,
      id: user._id,
    });
  } catch (error) {
    handleLoginError(error, next);
  }
};

const getUser = (req, res, next) => {
  const { userId } = req.user;

  res.status(200).json({
    id: userId,
  });
};

const handleRegistrationError = (error, next) => {
  if (error.code === 11000 && error.keyValue.email) {
    next(customError("Email Already Exists", 400));
  } else if (error.errors && error.errors.email && error.errors.email.message) {
    next(customError(error.errors.email.message, 400));
  } else {
    next(customError("Something went wrong", 500));
  }
};

const handleLoginError = (error, next) => {
  if (
    error.message === "User does not exist" ||
    error.message === "Wrong Password"
  ) {
    next(customError(error.message, 400));
  } else {
    next(customError("Something went wrong", 500));
  }
};

module.exports = { register, login, getUser };
