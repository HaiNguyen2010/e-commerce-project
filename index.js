const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
var flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const route = require("./routes/clients/index.route");
const routeAdmin = require("./routes/admin/index.route.js");

require("dotenv").config();
const database = require("./config/database");

const systemConfig = require("./config/system");

// Connect to database
database.connect();

const app = express();
const port = process.env.PORT;

// View engine setup
app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser("ABCDEFGHIKLM"));
app.use(session({
    secret: "ABCDEFGHIKLM",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));
app.use(flash());
// End Flash

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log("App listening on port 3000");
});