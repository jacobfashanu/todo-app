const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
// const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

// const port = 4000;


mongoose.connect(process.env.MONGODB_URL, {
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

app.use(
    cors({
      origin: ["https://todojacobf.com","https://www.todojacobf.com/api", "https://www.todojacobf.com", "https://app.todojacobf.com", "http://localhost:4000","http://localhost:5173",'file:///assets/index-z6wdSWEY.js' ,'https://frolicking-peony-d3d98e.netlify.app', 'https://bucolic-macaron-171720.netlify.app', "https://jacobftodo.netlify.app/", "https://todo-app-1wfp.onrender.com"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );

app.use(cookieParser());


app.use(express.json());




app.use("/", authRoute);




