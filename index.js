const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { blogRouter } = require("./routes/blogs.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.listen(8000, async () => {
  try {
    await connection;
    console.log("connected to database");
  } catch (error) {
    console.log(error.message);
  }
});
