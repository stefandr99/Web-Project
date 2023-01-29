import React, { useEffect, useState } from "react";
import "@triply/yasgui/build/yasgui.min.css";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { sparql } from "@codemirror/legacy-modes/mode/sparql";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { executeSparqlQuery } from "../services/query";
import { useApplicationStore } from "../useApplicationStore";
import { Button, Input, LoadingOverlay, Select } from "@mantine/core";

const queryTitles: string[] = [
  "Pick a query",
  "TogoStanza Genetic Information",
  "Japan Prefectures Area",
];

const queryPresets = [
  {
    title: "TogoStanza Genetic Information",
    endpoint: "http://togostanza.org/sparql",
    query: `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX id_tax:<http://identifiers.org/taxonomy/>
    PREFIX tax: <http://ddbj.nig.ac.jp/ontologies/taxonomy/>
    PREFIX stats:  <http://togogenome.org/stats/>
    PREFIX up: <http://purl.uniprot.org/core/>
    PREFIX ipr: <http://purl.uniprot.org/interpro/>
    
    SELECT DISTINCT ?organism ?label ?length ?genes (COUNT(DISTINCT ?protein) AS ?hks)
    {
      {
        SELECT DISTINCT ?organism ?up_tax ?label ?length ?genes
        WHERE
        {
          # Cyanobacteria (1117)
          ?organism a tax:Taxon ;
            rdfs:subClassOf+ id_tax:1117 ;
            stats:sequence_length ?length ;
            stats:gene ?genes ;
            tax:scientificName ?label .
            BIND (IRI(REPLACE(STR(?organism), "http://identifiers.org/taxonomy/", "http://purl.uniprot.org/taxonomy/")) AS ?up_tax)
        }
      }
      ?up_tax a up:Taxon .
      ?protein up:organism ?up_tax ;
        a up:Protein .
      # Signal transduction histidine kinase (IPR005467)
      ?protein rdfs:seeAlso ipr:IPR005467 .
    } GROUP BY ?organism ?label ?length ?genes ORDER BY ?length
          `,
  },
  {
    title: "Japan Prefectures Area",
    endpoint: "http://dbpedia.org/sparql",
    query: `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX yago: <http://dbpedia.org/class/yago/>
PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>

SELECT ?pref ?area
WHERE {
  ?s a yago:WikicatPrefecturesOfJapan ;
     rdfs:label ?pref ;
     dbpedia-owl:areaTotal ?area_total .
  FILTER (lang(?pref) = 'en')
  BIND ((?area_total / 1000 / 1000) AS ?area)
}
ORDER BY DESC(?area)`,
  },
];

const QueryInput = () => {
  const [value, setValue] = useState<any>(null);
  const [dbsource, setdbSource] = useState<any>("");
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nextStep = useApplicationStore((state) => state.nextStep);
  const setData = useApplicationStore((state) => state.setDataResult);
  const setStoreQuery = useApplicationStore((state) => state.setQuery);
  const setStoreSource = useApplicationStore((state) => state.setSource);

  const setGPTSuggestion = useApplicationStore(
    (state) => state.setGPTSuggestion
  );

  function runQuery() {
    setIsLoading(true);
    executeSparqlQuery(query, dbsource)
      .then((response) => {
        if (response && response.data) {
          setGPTSuggestion(response.data.graphSuggestion);
          setData(response.data.data);
          setStoreQuery(query);
          setStoreSource(dbsource);
          nextStep();
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  const onChange = React.useCallback((value: any) => {
    setQuery(value);
  }, []);

  return (
    <div className=" pb-16 w-full h-full">
      <div className="flex justify-between py-8">
        <div className="w-1/2 relative">
          <Input
            disabled={isLoading}
            className={"mt-0.5"}
            color="orange"
            placeholder="Query DB Source"
            defaultValue={dbsource}
            onChange={(e: any) => setdbSource(e.target.value)}
            size="sm"
          />
        </div>
        <div className={"flex items-center gap-5 mb-1"}>
          <Select
            value={queryTitles[0]}
            onChange={(value) => {
              const query = queryPresets.find((q) => q.title === value);
              if (query) {
                setQuery(query.query);
                setdbSource(query.endpoint);
              }
            }}
            data={queryTitles}
          />
          <Button
            disabled={isLoading}
            color="orange"
            radius="md"
            size="md"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            onClick={() => {
              runQuery();
            }}
          >
            Run
          </Button>
        </div>
      </div>
      <div className="text-xs rounded-md overflow-hidden relative">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <CodeMirror
          theme={okaidia}
          value={query}
          height="500px"
          onChange={(e) => {
            onChange(e);
          }}
          extensions={[StreamLanguage.define(sparql)]}
        />
      </div>
    </div>
  );
};

export default QueryInput;
