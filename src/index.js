const express = require("express");
const { PORT, CLIENT_URL } = require("./constantas");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
//import passport middleware
require("./middlewares/passport-middleware");
//initimaze middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());
// import Routes
const authRoutes = require("./routes/auth");

//initilaze routes
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`server has started on port :${PORT}`);
});
