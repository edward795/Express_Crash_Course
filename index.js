const express = require("express");
const logger = require("./middleware/logger");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./Members");
const app = express();

//initialize middleware
app.use(logger);

//set middleware for express-handlebars template engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//template engine routes
app.get("/", (req, res) =>
  res.render("layouts/index", { title: "Member App", members })
);

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static path
app.use(express.static(path.join(__dirname, "public")));

//home page
app.get("/", (req, res) => {});

//members route handler
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On port ${PORT}`));
