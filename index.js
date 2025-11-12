const express = require("express");

const route = require("./routes/clients/index.route");
const routeAdmin = require("./routes/admin/index.route.js");

require("dotenv").config();
const database = require("./config/database");

// Connect to database
database.connect();

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log("App listening on port 3000");
});