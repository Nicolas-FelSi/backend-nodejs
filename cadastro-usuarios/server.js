const express = require("express");
const dotenv = require("dotenv");
const db = require("./database/connection");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", userRoutes);

db.connect();

app.listen(port, () => {
    console.log("Backend rodando na porta " + port);
})