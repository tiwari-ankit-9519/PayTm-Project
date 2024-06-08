const mongoose = require("mongoose");
const Account = require("../models/Account");
const asyncHandler = require("express-async-handler");

exports.getBalance = asyncHandler(async (req, res) => {
  const account = await Account.findOne({ user: req.userAuthId });
  res.json({
    balance: account.balance,
  });
});

exports.transferBalance = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({
    userId: req.userAuthId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userAuthId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer Successful",
  });
});
