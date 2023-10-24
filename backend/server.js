require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter")
const messageRouter = require("./routes/messageRouter")

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter);
app.use('/api/messages', messageRouter)

const PORT = process.env.PORT;

// Connect to MongoDB
const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI)
  .then((result) => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log("Server is Running on port ", PORT);
    });
  })
  .catch((err) => console.log(err));
