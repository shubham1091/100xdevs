const { Router } = require("express");
const authMiddleware = require("../middleware/auth");
const { Account } = require("../db");
const mongoose = require("mongoose");

const route = Router();

route.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            res.status(404).json({ message: "Account not found" });
            return;
        }
        res.json({ balance: account.balance });
    } catch (error) {
        console.error("Error fetching balance: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

route.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const fromAccount = await Account.findOne({
            userId: req.userId,
        }).session(session);

        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Insufficient balance",
            });
            return;
        }

        const toAccount = await Account.findOne({ userId: to }).session(
            session
        );
        if (!toAccount) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Recipient account not found",
            });
            return;
        }

        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();

        res.json({ message: "Transfer successful" });
    } catch (error) {
        console.error("Error transferring funds: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = route;