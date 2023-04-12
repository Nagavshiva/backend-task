const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectdb = require("./config/db")
const userRouter = require("./routes/userRoutes");



// dotenv config
dotenv.config();


// db connection
connectdb();


const app = express();


//middlewares
app.use(express.json());



// routes
app.use("/users", userRouter);


//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running on port ${process.env.PORT}`
      .bgCyan.white
  );
});