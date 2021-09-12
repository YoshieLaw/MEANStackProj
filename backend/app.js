// import express to make API calls
const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

// import models that hold data in mongoDB
const List = require('./database/models/list');
const Task = require('./database/models/task');

// tells express to use JSON
app.use(express.json());


// enable CORS, cross origin request security
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GETS, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// create the routes, which are the URL endpoints
// GET ENDPOINT
app.get('/lists', (req, res) => {
    List.find({})
        .then(list => res.send(list))
        .catch((error) => console.log(error));
});

/**
 *  Other way of using et endpoint with using async and await
 * 
 * app.get('/lists', async (req, res) => {
        const list = await List.find({});
        res.send(list);
   });
 */

app.get('/lists/:listId', (req, res) => {
        const listId = req.params.listId 

        List.find({_id: req.params.listId})
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
})

app.get('/test/:x', (req, res) => {
        console.log('This is the param', req.params.x);
})

// POST ENDPOINT
app.post('/lists', (req, res) => {
        (new List({'title': req.body.title}))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error))
})

// PUT/PATCH ENDPOINT (for updating data)
app.patch('/list/:listId', (req, res) => {
        List.findOneAndUpdate({'_id' : req.params.listId}, {$set: req.body})
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
})



// get the server to connect on a port
const port_number = 3000;
app.listen(port_number, () => console.log("Server is connected on", port_number));