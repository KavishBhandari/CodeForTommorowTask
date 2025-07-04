require("dotenv").config();
const routes = require("./api/indexRoutes.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    message: 'Route not found !!',
  });
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server iss listening on the port is ${PORT}`);
});
