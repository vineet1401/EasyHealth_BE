const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const path = require("path");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin:"https://easy-health-sigma.vercel.app/",
  methods:["GET", "POST", "PUT", "DELETE", "PATCH"]
}));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(port, () => {console.log(`App is running on port ${port}`)});
