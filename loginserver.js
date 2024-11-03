import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "books_archive",
//     password: "",
//     port: 5433
// });

// db.connect();

const app = express();
const port = 3000;

// Add these middleware before your routes
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
})

app.get("/store.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'store.html'));
});

app.get("/forgotpassword", (req, res) => {
    res.sendFile(path.join(__dirname, 'forgotpassword.html'))
})

app.get("/payment.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'payment.html'));
});

app.get("/forgotpassword.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'forgotpassword.html'));
});

app.get("/aboutus.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'aboutus.html'));
});

app.get("/plans.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'plans.html'));
});

app.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        const name = req.body.signupUsername;
        const email = req.body.signupEmail;
        const password = req.body.signupPassword;
    
        // const result = await db.query("INSERT INTO users VALUES($1, $2, $3)", [
        //     name,
        //     email, 
        //     password
        // ]);
        res.sendFile(path.join(__dirname))
    } catch(error) {
        console.error(error);
        res.sendFile(path.join(__dirname, 'login.html'));
    }
});

app.post("/login", async (req, res) => {
    console.log(req.body);

    try {
        const email = req.body.loginEmail;
        const password = req.body.loginPassword;

        // const result =  await db.query("SELECT * FROM users WHERE email = $1 limit 1", [
        //     email
        // ]);

        // if (result.rowCount < 1) {
        //     if(result.rows[0].password == password) {
        //         res.sendFile(path.join(__dirname, 'index.html'));
        //     }
        // }

    } catch(error) {
        console.error(error);
    }
});

app.post("/forgotpassword", async (req, res) => {
    console.log(req.body);

    try {
        const email = req.body.forgotEmail;
        const password = req.body.password;
        const newpassword = req.body.newPassword;

        // const result =  await db.query("SELECT * FROM users WHERE email = $1 limit 1", [
        //     email
        // ]);

        // if (result.rowCount < 1) {
        //     res.sendFile(path.join(__dirname, 'login.html'));
        // }

        // await db.query("UPDATE users SET password = $1 where email = $2", [
        //     newpassword,
        //     email
        // ])
        res.sendFile(path.join(__dirname, 'login.html'));
    } catch(error) {
        console.error(error);
        res.sendFile(path.join(__dirname, 'login.html'));
    }
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});