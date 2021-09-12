// import express to make API calls
const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const bodyParser = require('body-parser');

// import models that hold data in mongoDB
const List = require('./database/models/list');
const Task = require('./database/models/task');

// tells express to use JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// enable CORS, cross origin request security
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GETS, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// create the routes, which are the URL endpoints
// GET ENDPOINT

/**
 *  Other way of using et endpoint with using async and await
 * 
 * app.get('/lists', async (req, res) => {
        const list = await List.find({});
        res.send(list);
   });
 */

app.get('/lists/', (req, res) => {
        const listID = req.query.listID

        if (typeof listID === 'undefined') {
                List.find({})
                        .then(list => res.send(list))
                        .catch((error) => console.log(error));
        } else {
                List.find({_id: listID})
                .then((list) => res.send(list))
                .catch((error) => console.log(error));
        }
        
})


// POST ENDPOINT
app.post('/lists', (req, res) => {
        (new List({'title': req.body.title}))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error))
})

// PUT/PATCH ENDPOINT (for updating data)
app.put('/lists', async (req, res) => {
        const listID = req.query.listID

        if (typeof listID === 'undefined') {
                res.status(404).send('listID param not found');
                
        } else {
                const list = await List.findOneAndUpdate({'_id' : req.query.listID}, {'title': req.body.title})
                res.send(list);
        }
        
})



// get the server to connect on a port
const port_number = 3000;
app.listen(port_number, () => console.log("Server is connected on", port_number));