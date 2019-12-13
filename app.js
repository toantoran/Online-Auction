const express = require("express");
const exphbs = require("express-handlebars");
const numeral = require("numeral");
const dateFormat = require("dateformat");
const hbs_sections = require('express-handlebars-sections');
const moment = require('moment');

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
        defaultLayout: "main-layout.hbs",
        helpers: {
            section: hbs_sections(),
            format_money: val => numeral(val).format('0,0') + ' đ',
            format_day: val => moment(val).format("DD-MM-YYYY"),
            format_day_time: val => moment(val).format("DD-MM-YYYY")+"  [" + moment(val).format("HH:mm:ss")+"]",
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
            }
        }
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