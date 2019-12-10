const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const cors = require("cors");

const app = express();
app.use(cors());
const connectDB = require("./_helper/db");

// Load env
dotenv.config({ path: "./_helper/config.env" });

// Connect to database
connectDB();

const PORT = process.env.PORT || 3000;

// Json Body Parser of express
app.use(express.json());

app.use("/users", userRoute);

app.listen(PORT, () => console.log(`Login app listening on port ${PORT}!`));
