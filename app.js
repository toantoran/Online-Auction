const express = require("express");
const app = express();

const exphbs = require("express-handlebars");
const numeral = require("numeral");
const dateFormat = require("dateformat");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const morgan = require("morgan");
// app.use(morgan("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.static("public"));

app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main-layout.hbs",
        helpers: {
            format_money: val => numeral(val).format("0,0") + " đ",
            format_money_bid: val => {
                val += val * 0.1;
                return numeral(val).format("0,0");
            },
            format_day: val => dateFormat(val, "dd-mm-yyyy"),
            format_day_time: val => dateFormat(val, "dd/mm/yyyy [h:MM:ss TT]"),
            format_name: val => {
                if (val.length > 25) {
                    var temp = "";
                    for (var i = 0; i < 25; i++) {
                        temp += val[i];
                    }
                    temp += "...";
                    return temp;
                }
                return val;
            },
            compare: (val1, val2) => val1 === val2
        }
    })
);
app.set("view engine", "hbs");

app.use(flash());
app.use(
    session({
        secret: "yato",
        resave: true,
        saveUninitialized: true
    })
);
require("./passport-config")(passport);
app.use(passport.initialize());
app.use(passport.session());

//Cái này để yên
require("./middlewares/locals.mdw")(app);
require("./middlewares/routes.mdw")(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});