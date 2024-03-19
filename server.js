//packages/dependencies
const express = require('express');
const app = express();
//port, env for user env.
const PORT = process.env.PORT || 3009;

//link routes to server

const htmlRoute = require('routes\htmlRoute.js');
const apiRoute = require('routes\apiRoute.js');

//middleware

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRoute);
app.use(htmlRoute);

app.listen(PORT, function () {
    console.log(`Example app listening at http://localhost:${PORT}`);
});