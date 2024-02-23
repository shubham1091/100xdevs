const express = require("express");
const rootRouter = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors(), express.json());

app.use("/api/v1", rootRouter);

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
