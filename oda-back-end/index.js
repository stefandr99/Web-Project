require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AuthRouter = require('./routes/auth.js');
const QueryEngine = require('@comunica/query-sparql').QueryEngine;
const mongoose = require('./db/connect.js');
const app = express();
const myEngine = new QueryEngine();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.use('/auth',AuthRouter);

app.get('/', async (req, res) => {
  const bindingsStream = await myEngine.queryBindings(
    `PREFIX dbo: <http://dbpedia.org/ontology/>

    SELECT ?country ?population
    WHERE {
        ?country a dbo:Country ;
                dbo:populationTotal ?population ;
                dbo:abstract ?abstract .
    }
    GROUP BY ?country ?population`,
    {
      sources: ['https://dbpedia.org/sparql'],
    },
  );

  //SPARQL FOR DBPEDIA TO GET COUNTRY POPULATION

  const result = [];

  bindingsStream.on('data', (binding) => {
    result.push({
      x: binding.get('country').value,
      value: binding.get('population').value,
    });
  });

  bindingsStream.on('end', () => {
    res.send(result);
  });
});

app.listen({ port: process.env.PORT }, () => console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`));
