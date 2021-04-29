/*
Minimalist proxy server to make requests CORS compliant

Copyright Julius Kramer 2021
*/

const express = require('express');
var request = require('request');
const app = express();
const PORT = 3000;
const HOST = "localhost";

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/forward/*", (req, res) => {
    url = req.url.substring("/forward/".length);
    console.log("Forwarding request to: " + url);
    request(url).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Starting proxy server at http://${HOST}:${PORT}`);
    console.log(`Simply make all requests to http://${HOST}:${PORT}/forward/your-website`);
    console.log(`Example: http://${HOST}:${PORT}/forward/https://www.google.com`);
});