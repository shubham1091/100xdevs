const express = require("express");
const zod = require("zod");
const app = express();

const schema = zod.array(zod.number());
const rate = 2;

let numberOfRequests = {};

setInterval(() => {
    numberOfRequests = {};
    // console.log("reset");
}, 1000 * 30);

app.use(express.json());

// user defined middleware
app.use(loggerMiddleware, rateLimite, siteVisite);

let VISITES = 0;

app.get("/", (req, res) => {
    res.send(`Hello ${req.headers["user-id"]}`);
});

app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);

    res.json({ response });
});

app.get("/site-visites", (req, res) => {
    res.json({
        visits: VISITES,
    });
});

// global chtches Error handlig middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({
        error: err.message,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function siteVisite(req, res, next) {
    VISITES++;
    next();
}

function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

function rateLimite(req, res, next) {
    const userID = req.headers["user-id"];
    if (
        numberOfRequests.hasOwnProperty(userID) &&
        numberOfRequests[userID] > rate
    ) {
        throw new Error(
            `${userID} has exceeded rate limit wait for server to cooldown`
        );
    } else {
        numberOfRequests[userID] = (numberOfRequests[userID] || 0) + 1;
        next();
    }
}
