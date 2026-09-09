// back-end/controllers/transactionController.js
const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel");


const transferFunds = async (req, res) => {
  try {
    const { senderAccNo, recipientName, recipientAccount, amount, description } = req.body;

    if (!recipientAccount || !amount || !senderAccNo) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ message: "Invalid transfer amount" });
    }

    const senderAcc = String(senderAccNo).trim();
    const recipientAcc = String(recipientAccount).trim();

    const senderAccount = await Account.findOne({ accNo: senderAcc });
    if (!senderAccount) return res.status(404).json({ message: "Sender account not found" });
    if (senderAccount.balance < amountNum) return res.status(400).json({ message: "Insufficient balance" });

    senderAccount.balance -= amountNum;
    await senderAccount.save();

    const recipientAccountDoc = await Account.findOne({ accNo: recipientAcc });
    if (recipientAccountDoc) {
      recipientAccountDoc.balance += amountNum;
      await recipientAccountDoc.save();

      await Transaction.create({
        senderId: recipientAccountDoc._id,
        recipientName: senderAccount.fullName,
        recipientAccount: senderAcc,
        amount: amountNum,
        description: "Credit from " + senderAccount.fullName,
        status: "Success",
        type: "Credit",
      });
    }

    const transaction = new Transaction({
      senderId: senderAccount._id,
      recipientName,
      recipientAccount: recipientAcc,
      amount: amountNum,
      description,
      status: "Success",
      type: "Debit",
    });

    await transaction.save();

    res.status(201).json({ message: "Fund transfer successful", transaction });
  } catch (error) {
    console.error("Transfer Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRecentTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({ senderId: userId })
      .sort({ createdAt: -1 })   // latest first
      .limit(5);                 // last 5 transactions

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent transactions" });
  }
};

const getDeposits = async (req, res) => {
  try {
    const deposits = await Transaction.find({
      senderId: req.params.userId,  // match the account number
      type: "Credit",
      status: "Success",
    }).sort({ createdAt: -1 });

    res.json(deposits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get Withdrawal History (Debit)
const getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Transaction.find({
      senderId: req.params.userId,
      type: "Debit",
      status: "Success",
    }).sort({ createdAt: -1 });

    res.json(withdrawals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDepositHistory = async (req, res) => {
  try {
    const deposits = await Transaction.find({
      type: "Credit",
      status: "Success",
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "fullName email accNo");

    res.status(200).json(deposits);
  } catch (err) {
    console.error("Error fetching deposit history:", err);
    res.status(500).json({ message: "Failed to fetch deposit history" });
  }
};

const getWithdrawalHistory = async (req, res) => {
  try {
    const withdrawals = await Transaction.find({
      type: "Debit",
      status: "Success",
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "fullName email accNo");

    res.status(200).json(withdrawals);
  } catch (err) {
    console.error("Error fetching withdrawal history:", err);
    res.status(500).json({ message: "Failed to fetch withdrawal history" });
  }
};


module.exports = { transferFunds, getRecentTransactions, getDeposits, getWithdrawals, getDepositHistory, getWithdrawalHistory };