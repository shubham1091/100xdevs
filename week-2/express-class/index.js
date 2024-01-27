const express = require("express");
const app = express();
app.use(express.json());

const users = [
    {
        name: "John",
        kideys: [
            { healthy: false },
            { healthy: true }
        ]
    }
];

// GET method to retrieve kidney information
app.get("/", (req, res) => {
    const johnKidneys = users[0].kideys;
    const numberOfKidneys = johnKidneys.length;
    const numOfHealthyKidneys = johnKidneys.filter(kid => kid.healthy).length;
    const numOfUnhealthyKidneys = numberOfKidneys - numOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numOfHealthyKidneys,
        numOfUnhealthyKidneys
    });
});

// POST method to add a kidney
app.post("/", (req, res) => {
    try {
        const isHealthy = req.body.isHealthy;
        if (isHealthy === undefined) {
            throw new Error("Missing 'isHealthy' property in request body");
        }

        users[0].kideys.push({ healthy: isHealthy });
        res.json({ msg: "Kidney added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT method to mark all kidneys as healthy
app.put("/", (req, res) => {
    users[0].kideys.forEach(kid => kid.healthy = true);
    res.json({ msg: "All kidneys marked as healthy" });
});

// DELETE method to remove unhealthy kidneys
app.delete("/", (req, res) => {
    let flag = false;
    const temp = [];
    users[0].kideys.forEach(kid => {
        if (!kid.healthy) {
            flag = true;
        } else {
            temp.push(kid);
        }
    });

    if (flag) {
        users[0].kideys = temp;
    }

    res.status(flag ? 200 : 411).json({
        msg: flag ? "Unhealthy kidney(s) removed successfully" : "No unhealthy kidney(s) found"
    });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
