const express = require("express");
const rootRouter = require("./routes");
const cors = require("cors");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 3000;

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(cors(), express.json(), logger("dev"));

app.use("/api/v1", rootRouter);

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
