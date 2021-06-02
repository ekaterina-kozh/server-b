const mysql = require('mysql2');
const express = require('express');
const bodyParser = require("body-parser");
var needle = require('needle');
var cheerio = require("cheerio");
let async = require('async');
var ip = require('ip');
const jsonParser = express.json();
let app = express();
const request = require('request');
let url = 'https://benefit.by/banki/belveb/kursy-valut/';
let url2 = 'https://myfin.by/converter?val_bestb=usd-1';
let offis = 'https://www.belveb.by/corporate/adresa-i-kontaktnye-telefony/';
let atm = 'https://mobile-business.by/belveb/contakty';
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json())
var cors = require('cors')

app.use(cors())

const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "bank",
    password: "root"
});

function filterBySubField(obj, subField, value) {
    let result = [];
    for (let k in Object.keys(obj)) {
        if (obj[k][subField] === value)
            result.push(obj[k]);
    }
    return result;
}

conn.connect(function (err) {
    if (!!err) {
        console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});


/*get all data*/
//show
app.get("/backend/", function (req, res) {
    conn.query("SELECT * FROM users", function (err, data) {
        if (err) return console.log(err);
        //res.json(data);
        res.render("index.hbs", {
            users: data
        });
    });
});

//edit
app.get("/backend/edit/:id", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM users WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("edit.hbs", {
            user: data[0]
        });
    });
});

//add
app.get("/backend/create", function (req, res) {
    res.render("create.hbs");
    //res.json(req.body);
});

app.get("/backend/show/:id", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM users WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("show.hbs", {
            user: data[0]
        });
    });
});
/***********************************/

/*show*/
/*Платежи*/
app.get("/backend/show/:id/payment", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM users WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("payment.hbs", {
            user: data[0]
        });
    });
});

/*Телефоны*/
app.get("/backend/show/:id/phones", function (req, res) {
    const id = req.params.id;
    conn.query("select * from phones where id_user = ?;", [id], function (err, data) {
        if (err) return console.log(err);
        data.id_us = id;
        res.render("phones.hbs", {
            phones: data
        });
    });
});
/*add*/
app.get("/backend/show/:id/phones/add", function (req, res) {
    const id = req.params.id;
    res.render("phone_add.hbs", {
        id: id
    });
});

/*edit*/
app.get("/backend/show/phones/:phone/edit", function (req, res) {
    const phone = req.params.phone;
    conn.query("SELECT * FROM phones where id=?", [phone], function (err, data) {
        if (err) return console.log(err);
        res.render("phone_edit.hbs", {
            phones: data[0]
        });
    });
});

/*Документы*/
app.get("/backend/show/:id/documents", function (req, res) {
    const id = req.params.id;
    conn.query("select * from documents where id_user = ?;", [id], function (err, data) {
        if (err) return console.log(err);
        let m = (data[0].data_v.getMonth() + 1).toString();
        let d = data[0].data_v.getDate().toString();
        if (m.length == 1 && d.length == 1) {
            data[0].data_v = data[0].data_v.getFullYear() + '-0' + m + '-0' + d;
        } else if (d.length == 1) {
            data[0].data_v = data[0].data_v.getFullYear() + '-' + m + '-0' + d;
        } else if (m.length == 1) {
            data[0].data_v = data[0].data_v.getFullYear() + '-0' + m + '-' + d;
        } else {
            data[0].data_v = data[0].data_v.getFullYear() + '-' + m + '-' + d;
        }
        data.id_us = id;
        res.render("documents.hbs", {
            documents: data
        });
    });
});


/*edit*/
app.get("/backend/show/documents/:document/edit", function (req, res) {
    const document = req.params.document;
    conn.query("SELECT * FROM documents where id_user=?", [document], function (err, data) {
        if (err) return console.log(err);
        let m = (data[0].data_v.getMonth() + 1).toString();
        let d = data[0].data_v.getDate().toString();
        if (m.length == 1 && d.length == 1) {
            data[0].data_v = data[0].data_v.getFullYear() + '-0' + m + '-0' + d;
        } else if (d.length == 1) {
            data[0].data_v = data[0].data_v.getFullYear() + '-' + m + '-0' + d;
        } else if (m.length == 1) {
            data[0].data_v = data[0].data_v.getFullYear() + '-0' + m + '-' + d;
        } else {
            data[0].data_v = data[0].data_v.getFullYear() + '-' + m + '-' + d;
        }
        res.render("documents_edit.hbs", {
            documents: data[0]
        });
    });
});

/*Данные*/
app.get("/backend/show/:id/sdata", function (req, res) {
    const id = req.params.id;
    conn.query("select * from s_data where id_user = ?;", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("sdata.hbs", {
            documents: data
        });
    });
});

/*edit*/
app.get("/backend/show/sdata/:sdata/edit", function (req, res) {
    const sdata = req.params.sdata;
    conn.query("SELECT * FROM s_data where id_user=?", [sdata], function (err, data) {
        if (err) return console.log(err);
        res.render("sdata_edit.hbs", {
            sdata: data[0]
        });
    });
});

/*Ключи входа*/
app.get("/backend/show/:id/singing", function (req, res) {
    const id = req.params.id;
    conn.query("select * from setting where id_user = ?;", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("singing_key.hbs", {
            keys_s: data[0]
        });
    });
});

/*Электронная почта*/
app.get("/backend/show/:id/emails", function (req, res) {
    const id = req.params.id;
    conn.query("select * from emails where id_user = ?;", [id], function (err, data) {
        if (err) return console.log(err);
        data.id_us = id;
        res.render("emails.hbs", {
            emails: data
        });
    });
});

/*add*/
app.get("/backend/show/:id/emails/add", function (req, res) {
    const id = req.params.id;
    res.render("email_add.hbs", {
        id: id
    });
});

/*edit*/
app.get("/backend/show/emails/:email/edit", function (req, res) {
    const email = req.params.email;
    conn.query("SELECT * FROM emails where id=?", [email], function (err, data) {
        if (err) return console.log(err);
        res.render("email_edit.hbs", {
            emails: data[0]
        });
    });
});

/******************************************/
/*payment*/
/*make*/

app.get("/backend/show/:id/payment/make", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM users WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("makepay.hbs", {
            user: data[0]
        });
    });
});

/*make pay*/
/*Списание*/
app.get("/backend/show/:id/payment/make/debiting", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT id, num FROM credit_card where id_user=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("debiting.hbs", {
            cards: data
        });
    });
});

/*Перевод*/
app.get("/backend/show/:id/payment/make/transfer", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT id, num FROM credit_card where id_user=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("transfer.hbs", {
            cards: data
        });
    });
});

/*Снятие наличных*/
app.get("/backend/show/:id/payment/make/cash", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT id, num FROM credit_card where id_user=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("cash.hbs", {
            cards: data
        });
    });
});

/*Свободный платеж*/
app.get("/backend/show/:id/payment/make/free", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT id, num FROM credit_card where id_user=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("free.hbs", {
            cards: data
        });
    });
});

/*Мобильная связь*/
app.get("/backend/show/:id/payment/make/mobile", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT id, num FROM credit_card where id_user=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("mobile.hbs", {
            cards: data
        });
    });
});

/*ЕРИП*/
app.get("/backend/show/:id/payment/make/erip", function (req, res) {
    const id = req.params.id;
    let return_data = {};

    async.parallel([
        function (parallel_done) {
            conn.query("SELECT id, num FROM credit_card where id_user=?", [id], function (err, results) {
                if (err) return parallel_done(err);
                return_data.table1 = results;
                parallel_done();
            });
        },
        function (parallel_done) {
            conn.query("SELECT * FROM type_erip", function (err, results) {
                if (err) return parallel_done(err);
                return_data.table2 = results;
                parallel_done();
            });
        }
    ], function (err) {
        if (err) console.log(err);
        res.render("erip.hbs", {
            main_data: return_data
        });
    });
});

/*show*/

app.get("/backend/show/:id/payment/showt", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM users WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("showpay.hbs", {
            user: data[0]
        });
    });
});

/*show transfer*/

/*Все транзакции*/
app.get("/backend/show/:id/payment/showt/allt", function (req, res) {
    const id = req.params.id;
    let pr = req.body;

    conn.query("call show_data(?,?,?)", [id, 'none', 'none'], function (err, data) {
        if (err) return console.log(err);
        res.render("show_all_tr.hbs", {
            tr: data[0]
        });
    });
});

/*Уведомления*/
app.get("/backend/show/:id/payment/showt/notif", function (req, res) {
    const id = req.params.id;
    let pr = req.body;

    conn.query("call notification(?,?)", [id, ''], function (err, data) {
        if (err) return console.log(err);
        res.render("nitificat.hbs", {
            cards: data[0]
        });
    });
});

/*Счет на картах*/
app.get("/backend/show/:id/payment/showt/cards", function (req, res) {
    const id = req.params.id;
    let pr = req.body;

    conn.query("call see_card(?)", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("see_card.hbs", {
            cards: data[0]
        });
    });
});

/*new card*/
app.get("/backend/show/:id/payment/newcard", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM type_card", function (err, data) {
        if (err) return console.log(err);
        data.id_us = id;
        res.render("newcard.hbs", {
            types: data
        });
    });
});

/*************************/

/*post hbs*/
//user
app.post("/backend/create", urlencodedParser, function (req, res) {

    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call new_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [us.lastname, us.firstname, us.middle_name, us.birth, us.address, us.nik, '', us.type_cl,
            us.in, us.snp, us.kv, us.data_v,
            us.phone, us.login, us.password, us.pin], function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

app.post("/backend/edit", urlencodedParser, function (req, res) {
    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("UPDATE users SET lastname=?, firstname=?, middle_name=?, birth=?, address=?, nik=?, photo=?, type_cl=? WHERE id=?",
        [us.lastname, us.firstname, us.middle_name, us.birth, us.address, us.nik, us.photo, us.type_cl, us.id],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

app.post("/backend/delete/:id", function (req, res) {

    const id = req.params.id;
    conn.query("DELETE FROM users WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});

//phone
/*add phone*/
app.post("/backend/phones/add", urlencodedParser, function (req, res) {
    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("insert into phones (phone, id_user) values (?,?)", [us.phone, us.id],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

/*edit phone*/
app.post("/backend/phones/edit", urlencodedParser, function (req, res) {
    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("update phones set phone=? where id=?", [us.phone, us.id],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

/*delete phone*/
app.post("/backend/delete/phones/:id", function (req, res) {

    const id = req.params.id;
    conn.query("DELETE FROM phones WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});

//email
/*add email*/
app.post("/backend/emails/add", urlencodedParser, function (req, res) {
    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("insert into emails (email, id_user) values (?,?)", [us.email, us.id],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

/*edit email*/
app.post("/backend/emails/edit", urlencodedParser, function (req, res) {
    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("update emails set email=? where id=?", [us.email, us.id],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

/*delete email*/
app.post("/backend/delete/emails/:id", function (req, res) {
    const id = req.params.id;
    conn.query("DELETE FROM emails WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});

//documents
/*edit documents*/
app.post("/backend/documents/edit", urlencodedParser, function (req, res) {
    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("update documents set i_n=?, s_n_p=?, kv=?, data_v=? where id_user=?", [us.in, us.snp, us.kv, us.data_v, us.id_user],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

//sdata
/*edit sdata*/
app.post("/backend/sdata/edit", urlencodedParser, function (req, res) {
    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("update s_data set login=?, password=? where id_user=?", [us.login, us.password, us.id_user],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

//keys
/*edit keys*/
app.post("/backend/keys_s/edit", urlencodedParser, function (req, res) {
    let us = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("update setting set pin=?, graf=? where id_user=?", [us.pin, us.graf, us.id_user],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

//newcard (payment)
app.post("/backend/newcard", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_new_card(?,?,?)", [pr.id, pr.num, pr.typec],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

/*payment*/
//free
app.post("/backend/free", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_pr_free(?,?,?,?,?,?,?,?)", [pr.ls, pr.unp, pr.pol, pr.code, pr.bank, pr.naz, pr.num, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

//erip
app.post("/backend/erip", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_pr_erip(?,?,?,?,?)", [pr.ps, pr.adr, pr.typep, pr.num, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

//Перевод
app.post("/backend/transfer", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_pr_transfer(?,?,?)", [pr.num, pr.pol, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

//наличные
app.post("/backend/cash", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call cash_withdrawal(?,?)", [pr.num, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

//оплата
app.post("/backend/debiting", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call debiting(?,?,?)", [pr.naz, pr.num, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});

//Мобильный телефон
app.post("/backend/mobile", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_pr_mobile(?,?,?)", [pr.pol, pr.num, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
            res.redirect("/");
        });
});


/***********************************************/
//other task

app.get('/backend/json/offices/:sity', function (req, resp) {
    const sity = req.params.sity;
    request(offis, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            let $ = cheerio.load(body);

            let obj = [];
            let name = [];
            let address = [];
            let tel = '';
            let des = '';
            let time = [];
            let all = [];
            let sities1 = [];

            function trim(str) {
                return str.replace(/^\s+|\s+$/g, '');
            }

            $('td > p').each(
                (index, item) => {
                    if (index !== 9 && index > 2 && index !== 5 && index !== 6 && index !== 7 && index !== 8) {
                        if ((index === 3) || (index > 9 && (index % 2) === 0)) {
                            name.push(trim($(item).text()));
                        }
                        if ((index === 4) || (index > 9 && (index % 2) !== 0)) {
                            address.push(trim($(item).text()));
                        }
                    }
                    if (index === 7) {
                        tel = trim($(item).text());
                    }
                    if (index === 6) {
                        des = trim($(item).text());
                    }
                    if (index === 5 || index === 8) {
                        time.push(trim($(item).text()));
                    }
                }
            );
            for (let i = 0; i < name.length; i++) {
                let str = address[i];
                if (str.indexOf('г.') !== -1) {
                    sities1.push(str.substring(str.indexOf('г.'), str.indexOf(',', str.indexOf('г.'))));
                } else {
                    sities1.push(str.split(',')[1]);
                }
                all.push({name: name[i], address: address[i], sity: sities1[i]});
            }
            let sities = [...new Set(sities1)];

            obj.push(
                {all: filterBySubField(all, 'sity', sity), des: des, time: time.join(' '), tel: tel, sities: sities}
            );

            resp.json(obj);
        }
    });
});

app.get('/backend/json/atm/:sity', function (req, resp) {
    const sity1 = req.params.sity;
    request(atm, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            let $ = cheerio.load(body);

            let obj = [];
            let name = [];
            let sity = [];
            let address = [];
            let tel = '';
            let time = [];
            let all = [];

            function trim(str) {
                return str.replace(/^\s+|\s+$/g, '');
            }

            $('#atm-table-c > table > tbody > tr > td > div > div > h4').each(
                (index, item) => {
                    name.push($(item).text());
                }
            );

            $('#atm-table-c > table > tbody > tr > td > div > div.c.city').each(
                (index, item) => {
                    address.push(trim($(item).text()));
                    sity.push(trim($(item).text()).slice(0, trim($(item).text()).indexOf(',')));
                }
            );

            let sities = [...new Set(sity)];

            $('#atm-table-c > table > tbody > tr:nth-child(1) > td > div > div.c.ph').each(
                (index, item) => {
                    tel = trim($(item).text()).slice(0, 17) + ' ' + trim($(item).text()).slice(23);
                }
            );

            $('#atm-table-c > table > tbody > tr > td > div > div:nth-child(4) > a').each(
                (index, item) => {
                    time.push(trim($(item).text()));
                }
            );

            for (let i = 0; i < address.length; i++) {
                all.push({name: name[i], address: address[i], sity: sity[i], time: time[i]});
            }
            obj.push(
                {all: filterBySubField(all, 'sity', sity1), tel: tel, sities: sities}
            );

            resp.json(obj);
        }
    });
});

app.get('/backend/json/curs', function (req, resp) {
    request(url2, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            const obj = [];
            const arr1 = [];
            const arr2 = [];
            const tr1 = [];
            const tr2 = [];
            let $ = cheerio.load(body);

            function trim(str) {
                return str.replace(/^\s+|\s+$/g, '');
            }

            $('#best_buy > div.converter-container__inputs > div > div > div.converter-container__item-currency-name').each(
                (index, item) => {
                    tr1.push(trim($(item.children[0]).text()))
                }
            );
            $('#best_buy > div.converter-container__inputs > div > div > div.converter-container__item-input-wrapper').each(
                (index, item) => {
                    arr2.push({
                        index: index,
                        abbr: trim($(item.children[0]).text()),
                        sum: $(item.children[1]).attr('value'),
                        tr: tr1[index]
                    })
                }
            );

            $('#best_sell > div.converter-container__inputs > div > div > div.converter-container__item-currency-name').each(
                (index, item) => {
                    tr2.push(trim($(item.children[0]).text()))
                }
            );
            $('#best_sell > div.converter-container__inputs > div > div > div.converter-container__item-input-wrapper').each(
                (index, item) => {
                    arr1.push({
                        index: index,
                        abbr: trim($(item.children[0]).text()),
                        sum: $(item.children[1]).attr('value'),
                        tr: tr2[index]
                    })
                }
            );

            obj.push({buy: arr2, sell: arr1})
            resp.json(obj);
        }
    });
})

app.get('/backend/json/curs/bot', function (req, resp) {
    request('https://myfin.by/bank/bvebank/currency', function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            const obj = [];
            const dollar = [];
            const evro = [];
            let $ = cheerio.load(body);

            function trim(str) {
                return str.replace(/^\s+|\s+$/g, '');
            }

            $('#workarea > div.bank-info-head.content_i > div > div > div > div > table > tbody > tr:nth-child(1) > td').each(
                (index, item) => {
                    dollar.push(trim($(item).text()))
                }
            );

            $('#workarea > div.bank-info-head.content_i > div > div > div > div > table > tbody > tr:nth-child(2) > td').each(
                (index, item) => {
                    evro.push(trim($(item).text()))
                }
            );

            obj.push({dollar: dollar, evro: evro})

            resp.json(obj);
        }
    });
})


app.get('/backend/json/timework', function (req, resp) {
    request('https://yandex.by/search/?text=%D0%B1%D0%B5%D0%BB%D0%B2%D1%8D%D0%B1%20%D0%B1%D0%B0%D0%BD%D0%BA%20%D1%87%D0%B0%D1%81%D1%8B%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B&lr=26030&clid=2196598', function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            const obj = [];
            let $ = cheerio.load(body);

            $('div.fact-answer.typo.typo_text_l.typo_line_m.fact__answer').each(
                (index, item) => {
                    obj.push($(item).html())
                }
            );

            resp.json(obj);
        }
    });
})

app.get('/backend/json/data/bot', function (req, resp) {
    request('https://bbf.ru/calendar/today/', function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            const obj = [];
            let $ = cheerio.load(body);

            $('body > div.page > div > div > div > div > div.calendar > div > div:nth-child(4)').each(
                (index, item) => {
                    obj.push($(item).text())
                }
            );

            resp.json(obj);
        }
    });
})


app.get('/backend/json/extraliga', function (req, resp) {
    request('https://hockey.by/news/sobytie/news114432.html', function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            const obj = [];
            let $ = cheerio.load(body);

            function trim(str) {
                return str.replace(/^\s+|\s+$/g, '');
            }

            $('article > ul > li').each(
                (index, item) => {
                    obj.push(trim($(item).text()))
                }
            );

            resp.json(obj);
        }
    });
})


app.get('/backend/json/news', function (req, resp) {

    const arr = [];
    const arr1 = [];
    const obj = [];
    const str = 'https://www.belveb.by';

    request('https://www.belveb.by/about/novosti/novosti-banka/', function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            let $ = cheerio.load(body);

            function trim(str) {
                return str.replace(/^\s+|\s+$/g, '');
            }

            $('body > div.page-wrap > div.layout-row > div > main > div.main-content > div > div.l-news-row > div > div > div > div > a').each(
                (index, item) => {
                    if (index < 3) {
                        arr.push($(item).attr('href'))
                    }
                }
            );
            $('body > div.page-wrap > div.layout-row > div > main > div.main-content > div > div.l-news-row > div > div > div > div > a > div').each(
                (index, item) => {
                    if (index < 3) {
                        arr1.push(trim($(item).text()))
                    }
                }
            );
            for (let i = 0; i < arr.length; i++) {
                obj.push({title: arr1[i], href: arr[i].split('/')[4]});
            }


            resp.json(obj);
        }
    });
})

app.get('/backend/json/news/:href', function (req, resp) {
    const href = req.params.href;
    let arr = '';
    const str = 'https://www.belveb.by/about/novosti/novosti-banka/';
    content1 = [];
    title1 = [];

    request(str + href + '/', function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            let $ = cheerio.load(body);

            function trim(str) {
                return str.replace(/^\s+|\s+$/g, '');
            }

            $('body > div.page-wrap > div.layout-row > div > main > div.main-content > div > section > div').each(
                (index, item) => {
                    content1 = trim($(item).text());
                }
            );

            $('body > div.page-wrap > div.layout-row > div > main > div.main-content > div > section > div > b').each(
                (index, item) => {
                    title1 = trim($(item).text().replace(/\n/g,'<br>'));
                }
            );

            resp.json({title: title1, content: content1});
        }
    });
})

app.get("/backend/check/user", function (req, res) {
    console.log(ip.address());
});


/************************************/
//json format
app.get("/backend/json/getkey/:id", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM setting where id_user = ?", [id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});

app.get("/backend/json/alltr/:ip/:num/:type", function (req, res) {

    conn.query("call show_data((select id_user from s_data where ip = ?),?,?)", [req.params.ip, req.params.num, req.params.type], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});

//profile && setting
app.get("/backend/json/user/:id", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM users where id = ?", [id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});

app.get("/backend/json/user/emails/:id", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM emails where id_user = ?", [id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});

app.get("/backend/json/user/phone/:id", function (req, res) {
    const id = req.params.id;
    conn.query("SELECT * FROM phones where id_user = ?", [id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});

app.get("/json/user/sdata/:id", function (req, res) {
    const ip = req.params.id;
    conn.query("SELECT * FROM s_data where id_user = (select id_user from s_data where ip = ?)", [ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});

//search and get user by ip
app.get("/backend/json/get/user/:ip", function (req, res) {
    const ip = req.params.ip;
    conn.query("call check_user(?)", [ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});

app.post("/backend/json/post/user", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    /*   response.json(request.body);*/
    conn.query("update s_data set ip = ? where id_user = ?", [pr.ip, pr.id_user], function (err, data) {
        if (err) return console.log(err);
    });
})


app.get("/backend/json/get/user/data/:login/:password", function (req, res) {
    conn.query("call check_user_auth(?,?)", [req.params.login, req.params.password], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/get/user/setting/:ip", function (req, res) {
    conn.query("select language, theme, pin, graf from setting where id_user = (select id_user from s_data where ip = ?)", [req.params.ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.post("/backend/json/get/user/setting/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("update setting set pin=?, graf=? where id_user = (select id_user from s_data where ip = ?)", [pr.pin, pr.graf, pr.ip], function (err, data) {
        if (err) return console.log(err);
    });
})

app.post("/backend/json/get/user/setting/other/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("update setting set language=?, theme=? where id_user = (select id_user from s_data where ip = ?)", [pr.language, pr.theme, pr.ip], function (err, data) {
        if (err) return console.log(err);
    });
})


app.get("/backend/json/get/user/photo_nik/:ip", function (req, res) {
    conn.query("select nik, photo from users where id = (select id_user from s_data where ip = ?)", [req.params.ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.post("/backend/json/get/user/photo_nik/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("update users set nik=?, photo=? where id = (select id_user from s_data where ip = ?)", [pr.nik, pr.photo, pr.ip], function (err, data) {
        if (err) return console.log(err);
    });
})

app.get("/backend/json/get/user/data/:ip", function (req, res) {
    conn.query("select lastname, firstname, middle_name, address, type_cl from users where id = (select id_user from s_data where ip = ?)", [req.params.ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/get/user/documents/:ip", function (req, res) {
    conn.query("select i_n, s_n_p, kv, DATE_FORMAT(data_v, '%d.%m.%Y') as 'data_v' from documents where id_user = (select id_user from s_data where ip = ?)", [req.params.ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/get/user/phones/:ip", function (req, res) {
    conn.query("select id, phone from phones where id_user = (select id_user from s_data where ip = ?)", [req.params.ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/get/user/emails/:ip", function (req, res) {
    conn.query("select id, email from emails where id_user = (select id_user from s_data where ip = ?)", [req.params.ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.post("/backend/json/get/emails/delete/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("delete from emails where id = ?", [pr.id], function (err, data) {
        if (err) return console.log(err);
    });
})

app.post("/backend/json/get/phones/delete/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("delete from phones where id = ?", [pr.id], function (err, data) {
        if (err) return console.log(err);
    });
})

app.post("/backend/json/get/emails/edit/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("update emails set email=? where id = ?", [pr.email, pr.id], function (err, data) {
        if (err) return console.log(err);
    });
})

app.post("/backend/json/get/phones/edit/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("update phones set phone=? where id = ?", [pr.phone, pr.id], function (err, data) {
        if (err) return console.log(err);
    });
})

app.post("/backend/json/get/emails/add/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("insert into emails (id_user, email) values ((select id_user from s_data where ip = ?),?)", [pr.ip, pr.email], function (err, data) {
        if (err) return console.log(err);
    });
})

app.post("/backend/json/get/phones/add/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("insert into phones (id_user, phone) values ((select id_user from s_data where ip = ?),?)", [pr.ip, pr.phone], function (err, data) {
        if (err) return console.log(err);
    });
})

app.post("/backend/json/get/sdata/edit/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("update s_data set login=?, password=? where ip=?", [pr.login, pr.password, pr.ip], function (err, data) {
        if (err) return console.log(err);
    });
})

app.post("/backend/json/exit/", jsonParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);
    conn.query("update s_data set ip='' where ip=?", [pr.ip], function (err, data) {
        if (err) return console.log(err);
    });
})

app.get("/backend/json/allcard/:ip", function (req, res) {
    conn.query("select id, num from credit_card where id_user = (select id_user from s_data where ip = ?) and status = 'active'", [req.params.ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/alltypes", function (req, res) {
    conn.query("select * from type_pr", function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/card/one/:ip/:num", function (req, res) {
    conn.query("select sum from credit_card where id_user = (select id_user from s_data where ip = ?) and num = ?", [req.params.ip, req.params.num], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/type/erip", function (req, res) {
    conn.query("SELECT * FROM type_erip", function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.post("/backend/json/transfer", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_pr_transfer(?,?,?)", [pr.num, pr.pol, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
        });
});

//free
app.post("/backend/json/free", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_pr_free(?,?,?,?,?,?,?,?)", [pr.ls, pr.unp, pr.pol, pr.code, pr.bank, pr.naz, pr.num, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
        });
});

//erip
app.post("/backend/json/erip", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_pr_erip(?,?,?,?,?)", [pr.ps, pr.adr, pr.typep, pr.num, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
        });
});

//Мобильный телефон
app.post("/backend/json/mobile", urlencodedParser, function (req, res) {
    let pr = req.body;
    if (!req.body) return res.sendStatus(400);

    conn.query("call create_pr_mobile(?,?,?)", [pr.pol, pr.num, pr.sum],
        function (err, data) {
            if (err) return console.log(err);
        });
});

app.get("/backend/json/history", function (req, res) {
    conn.query("SELECT id, name, MAX(id) date FROM procedure_u GROUP BY name ORDER BY date DESC limit 3", function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/one/:ip", function (req, res) {
    conn.query("SELECT id, num, sum, (select name from type_card where type_card.id=credit_card.id_type_card) as 'type' FROM credit_card " +
        "where id_user = (select id_user from s_data where ip = ?)", [req.params.ip], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/one/id/:id", function (req, res) {
    conn.query("SELECT id, num, period, sum, status, (select name from type_card where type_card.id=credit_card.id_type_card) as 'type', (select photo from type_card where type_card.id=credit_card.id_type_card) as 'photo' FROM credit_card " +
        "where id = ?", [req.params.id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/date", function (req, res) {
    conn.query("select date(now()) as 'date', MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL QUARTER(CURDATE()) QUARTER \n" +
        " - INTERVAL    1   QUARTER as 'quarter', DATE_ADD(now(), INTERVAL -1 year) as 'year', DATE_ADD(now(), INTERVAL -1 MONTH) as 'mount'", function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/report/data/:id/:ip", function (req, res) {
    conn.query("select concat(u.lastname, ' ', u.firstname, ' ', u.middle_name) as 'name', c.num, c.sum " +
        "from users as u, s_data as s, credit_card as c " +
        "where s.id_user = u.id and s.ip = ? and c.id = ?", [req.params.ip, req.params.id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/report1/data/year/:id", function (req, res) {
    conn.query("select pr.data_pr, pr.name, pr.sum from procedure_u as pr where pr.card_num = ? and year (pr.data_pr) = year (now())", [req.params.id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/report1/data/month/:id", function (req, res) {
    conn.query("select pr.data_pr, pr.name, pr.sum from procedure_u as pr where pr.card_num = ? and month (pr.data_pr) = month (now())", [req.params.id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/report1/data/quarter/:id", function (req, res) {
    conn.query("select pr.data_pr, pr.name, pr.sum from procedure_u as pr where pr.card_num = ? and quarter (pr.data_pr) = quarter (now())", [req.params.id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/report1/data/time/:id/:time", function (req, res) {
    conn.query("select pr.data_pr, pr.name, pr.sum from procedure_u as pr where pr.card_num = ? and pr.data_pr BETWEEN ? AND Now()", [req.params.id, req.params.time], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.get("/backend/json/card/status/:id", function (req, res) {
    conn.query("select id, status from credit_card where id = ?", [req.params.id], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
})

app.post("/backend/json/block/card", function (req, res) {
    conn.query("update credit_card set status = 'block' where id = ?", [req.body.id], function (err, data) {
        if (err) return console.log(err);
    });
})


app.get('/backend/json/procent/:id', function (req, res) {
    conn.query("SELECT SUBSTRING_INDEX(name, ' ', 1) as 'name', COUNT(*) as 'procent' FROM " +
        " procedure_u where card_num = ? and (type_pr = 1 or type_pr = 4)" +
        " group by SUBSTRING_INDEX(name, ' ', 1)", [req.params.id, req.params.id],
        function (err, data) {
            if (err) return console.log(err);
            res.json(data);
        })
})

app.post("/backend/json/debiting", urlencodedParser, function (req, res) {
    conn.query("call debiting(?,?,?)", [req.body.naz, req.body.num, req.body.sum],
        function (err, data) {
            if (err) return console.log(err);
        });
});

app.get("/backend/json/notif/:ip/:type", function (req, res) {
    conn.query("call notification((select id_user from s_data where ip= ?), ?)", [req.params.ip, req.params.type], function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});

app.listen(3080,  function () {
    console.log("Сервер ожидает подключения...");
});
