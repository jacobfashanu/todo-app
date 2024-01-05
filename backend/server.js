const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
// const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const port = 4000;


mongoose.connect(process.env.MONGODB_URL, {
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.use(
    cors({
      origin: ["http://localhost:4000","http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );

app.use(cookieParser());


app.use(express.json());




app.use("/", authRoute);




