import React, { useEffect, useState } from "react";
import "@triply/yasgui/build/yasgui.min.css";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { sparql } from "@codemirror/legacy-modes/mode/sparql";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { executeSparqlQuery } from "../services/query";
import { useApplicationStore } from "../useApplicationStore";

const QueryInput = () => {
  const [dbsource, setdbSource] = useState<any>("http://togostanza.org/sparql");
  const [query, setQuery] =
    useState<string>(`PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
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
          `);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nextStep = useApplicationStore((state) => state.nextStep);
  const setData = useApplicationStore((state) => state.setDataResult);
  const setGPTSuggestion = useApplicationStore(
    (state) => state.setGPTSuggestion
  );

  function runQuery() {
    executeSparqlQuery(query, dbsource)
      .then((response) => {
        if (response && response.data) {
          setGPTSuggestion(response.data.graphSuggestion);
          setData(response.data.data);
          nextStep();
        }
      })
      .catch((error) => {});
  }

  const onChange = React.useCallback((value: any) => {
    setQuery(value);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" pb-16 w-full h-full">
      <div className="flex justify-between py-8">
        <div className="w-1/2">
          <input
            defaultValue={dbsource}
            onChange={(e) => setdbSource(e.target.value)}
            className="bg-[#1a1a1a] text-sm py-2 px-2 w-full border-black border-[1px] rounded-lg"
          ></input>
        </div>
        <button
          className="text-xl bg-orange-500 hover:bg-orange-600 transition-all ease-in-out duration-150 px-4 py-2 rounded-xl"
          onClick={() => {
            runQuery();
          }}
        >
          Run
        </button>
      </div>
      <div className="text-xs rounded-md overflow-hidden">
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
