const express = require('express');
const QueryEngine = require('@comunica/query-sparql').QueryEngine;

const app = express();
const myEngine = new QueryEngine();

app.get('/', async (req, res) => {
  const bindingsStream = await myEngine.queryBindings(
    `PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    SELECT ?country ?city ?city_name ?country_name
    WHERE {
        ?city rdf:type dbo:City ;
              foaf:name ?city_name ;
              dbo:country ?country ;
              dbo:populationTotal ?population ;
              ?country rdf:type dbo:Country ;
                  foaf:name ?country_name .
    
        ?country foaf:name \"Romania\"@en .
    
        FILTER(langMatches(lang(?city_name), \"en\"))
    }
    ORDER BY ?city_name
    LIMIT 100`,
    {
      sources: ['https://dbpedia.org/sparql'],
    },
  );

  //SPARQL FOR DBPEDIA TO GET COUNTRY POPULATION

  const result = [];

  bindingsStream.on('data', (binding) => {
    result.push({
      x: binding.get('country_name').value,
      value: binding.get('city_name').value,
    });
  });

  bindingsStream.on('end', () => {
    res.send(result);
  });
});

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000`));
