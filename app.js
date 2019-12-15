const express = require("express");
const exphbs = require("express-handlebars");
const numeral = require("numeral");
const hbs_sections = require('express-handlebars-sections');
const moment = require('moment');

const app = express();

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
            section: hbs_sections(),
            format_money: val => numeral(val).format('0,0') + ' đ',
            format_day: val => moment(val).format("DD/MM/YYYY"),
            format_day_time: val => moment(val).format("DD/MM/YYYY")+"  [" + moment(val).format("HH:mm:ss")+"]",
            format_birthday: val => moment(val).format("MM/DD/YYYY"),
            format_day_value: val=> moment(val).valueOf(),
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