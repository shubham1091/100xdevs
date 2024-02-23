const { Router } = require("express");
const authMiddleware = require("../middleware/auth");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const route = Router();

route.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });

    res.json({ balance: account.balance });
});

route.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const account = await Account.findOne({ userId: req.userId }).session(
        session
    );

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance",
        });
        return;
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Account does not exist",
        });
        return;
    }

    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -account } }
    ).session(session);
    await Account.updateOne(
        { userId: to },
        { $inc: { balance: account } }
    ).session(session);

    await session.commitTransaction();

    res.json({ message: "Transfer successful" });
});
