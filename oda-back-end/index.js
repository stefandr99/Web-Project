const express = require('express');
const QueryEngine = require('@comunica/query-sparql').QueryEngine;

const app = express();
const myEngine = new QueryEngine();
var cors = require('cors')

app.use(cors())

app.use(express.json());



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

  const result = [];

  bindingsStream.on('data', (binding) => {
    result.push(binding);
  });

  bindingsStream.on('end', () => {
    res.send(result);
  });
});


app.post('/sparql', async (req, res) => {

  console.log(req.body.query);

  const result = await myEngine.query(
    req.body.query,
    {
      sources: [req.body.source],
    },
  );

  const {data} = await myEngine.resultToString(result, 'table');

  res.send(data);
  

  // bindingsStream.on('data', (binding) => {
  //   result.push(binding);
  // });

  // bindingsStream.on('end', () => {
  //   res.send(result);
  // });
});


app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000`));
