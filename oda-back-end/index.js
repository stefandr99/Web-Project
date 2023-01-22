require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const d3 = require('d3-sparql');
const AuthRouter = require('./routes/auth.js');
const SPARQLRouter = require('./routes/sparql.js');
const QueryEngine = require('@comunica/query-sparql').QueryEngine;
// const mongoose = require('./db/connect.js');
const app = express();
const myEngine = new QueryEngine();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.use('/auth',AuthRouter);
app.use('/sparql',SPARQLRouter);


app.listen({ port: process.env.PORT }, () => console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`));
