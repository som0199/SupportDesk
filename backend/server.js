const express = require("express");
require("dotenv").config();
const colors = require("colors");
const { connectDB } = require("./config/db_config");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 5000;
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB connect
connectDB();

app.get("/", (req, res) => {
  res.json({ msg: "WELCOME TO TICKET API" });
});

//User routes
app.use("/api/user", require("./routes/userRouter"));

//Ticket routes
app.use("/api/ticket", require("./routes/ticketRoutes"));

//Admin routes
app.use("/api/admin", require("./routes/adminRoutes"));

//Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is Running at Port: ${PORT}`.bgWhite.blue);
});
