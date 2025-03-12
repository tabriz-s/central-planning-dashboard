const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/optimize", async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:5001/optimize", req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error connnecting to the optimizer:", error);
        res.status(500).json({ error: "Failed to fetch optimization results" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});