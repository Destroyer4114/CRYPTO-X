const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,


});

exports.register = (req, res) => {
    console.log(req.body);

    // const name=req.body.name;
    // const email=req.body.email;
    // const password=req.body.password;
    // const passwordConfirm=req.body.passwordConfirm;

    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        }

        else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'password do not match'
            })

        }



        // let hashedPassword=await bcrypt.hash(password,8);
        // console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: password }, (error, resuts) => {
            if (error) {
                console.log(error);

            }
            else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                })

            }
        })
    });
}

exports.login = (req, res) => {
    console.log(req.body);


    const { email, password } = req.body;
    db.query('SELECT email FROM users WHERE email = ? and password= ?', [email, password], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length == 0) {
            return res.render('login', {
                message: 'Wrong email id or password'
            })
        }
        else {
            console.log(results);
            return res.render('login', {
                message: 'User logged in'
            })

        }




        // let hashedPassword=await bcrypt.hash(password,8);
        // console.log(hashedPassword);

        // db.query('SELECT * FROM users WHERE email = ? AND password= ?', [email, password], async (error, resuts, fields) => {
        //     if (error) {
        //         console.log(error);

        //     }
        //     console.log(results);
        //     if (results.length == 0) {
        //         return res.render('login', {
        //             message: 'Wrong Password'
        //         })
        //     }
        //     else {
        //         console.log(results);
        //         return res.render('login', {
        //             message: 'User logged in'
        //         })

        //     }
        // })
    });
}
