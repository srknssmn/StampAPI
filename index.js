import express from "express";
import 'dotenv/config';
const app = express();

app.get("/", (req, res) => {
    res.send("Stamp App API ...")
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})