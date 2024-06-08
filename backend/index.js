const express = require("express");
const connectDB = require("./config/dbConnect");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const accountRouter = require("./routes/accountRouter");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/accounts", accountRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
