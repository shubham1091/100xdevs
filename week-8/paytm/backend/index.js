const express = require("express");
const rootRouter = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors(), express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
