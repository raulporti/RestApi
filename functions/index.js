const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/timestamp', (request, response)=>{
    response.send("Hello from Firebase!");
})
    exports.helloWorld = functions.https.onRequest(app);
