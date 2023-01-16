const express = require('express');
const router = express.Router();
const d3 = require('d3-sparql');

router.post('/', async (req, res) => {
    const endpoint = req.body.endpoint;
    const query = req.body.query;

    d3.sparql(endpoint, query)
    .then((results) => {
        console.log(results); 
        res.send(results);
    });

});

module.exports = router;