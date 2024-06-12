const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("../utils/validators");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const Account = require("../models/Account");

exports.registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const result = registerUserSchema.safeParse({
    firstName,
    lastName,
    username,
    password,
  });

  if (!result.success) {
    const errorMessage = result.error.errors.map((err) => err.message);
    return res.status(400).json({
      message: errorMessage[1] || "Validation failed",
    });
  }

  const userFound = await User.findOne({ username });

  if (userFound) {
    return res.status(409).json({
      message: "User already exists!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    username,
    password: hashedPassword,
  });

  await Account.create({
    user: user?._id,
    balance: 1 + Math.random() * 10000,
  });

  res.status(201).json({
    status: "success",
    message: "User Created Successfully",
    token: generateToken(user._id),
  });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = loginUserSchema.safeParse({
    username,
    password,
  });

  if (!result.success) {
    const errorMessage = result.error.errors
      .map((err) => err.message)
      .join(",");
    return res.status(400).json({
      message: errorMessage || "Validation Error",
    });
  }

  const userFound = await User.findOne({ username });

  if (!userFound) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  const isMatch = await bcrypt.compare(password, userFound.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid password!",
    });
  }

  res.status(201).json({
    status: "success",
    message: "User logged in successfully",
    token: generateToken(userFound?._id),
  });
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, password } = req.body;
  const { success } = updateUserSchema.safeParse({
    firstName,
    lastName,
    password,
  });

  if (!success) {
    const errorMessage = updateUserSchema.error.errors.map(
      (err) => err.message
    );
    return res.status(400).json({
      message: errorMessage || "Validation Error",
    });
  }

  const userFound = await User.findOne({ _id: req.userAuthId });
  if (!userFound) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  const updatedData = {
    firstName,
    lastName,
  };

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedData.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(userFound._id, updatedData, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    message: "User profile updated successfully",
    user: updatedUser,
  });
});

exports.getUsers = asyncHandler(async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const loggedInUserId = req.userAuthId;

    const users = await User.find({
      _id: { $ne: loggedInUserId },
      $or: [
        {
          firstName: {
            $regex: filter,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: filter,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});
