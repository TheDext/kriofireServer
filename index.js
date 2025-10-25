const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const router = require("./router/index.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);


const start = async () => {
    try {
        app.listen(8080, () => {
            console.log(`Server has been started at port 8080`);
        });
    } catch (error) {
        console.error('Ошибка при запуске сервера:', error);
    }
};

start();