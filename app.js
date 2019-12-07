const express = require("express");
const exphbs = require("express-handlebars");
const app = express();


app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.static('public'));


app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main-layout.hbs"
    })
);
app.set("view engine", "hbs");


//Cái này để yên
require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});