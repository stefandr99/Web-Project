import React, { useEffect, useState } from 'react';
import "@triply/yasgui/build/yasgui.min.css";
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { sparql } from '@codemirror/legacy-modes/mode/sparql';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { executeSparqlQuery } from '../services/query';
import { useApplicationStore } from '../useApplicationStore';



const QueryInput = () => {
  const [dbsource, setdbSource] = useState<any>('http://dbpedia.org/sparql')
  const [query, setQuery] = useState<string>(`PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
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
  ORDER BY DESC(?area)`)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const nextStep = useApplicationStore((state) => state.nextStep)
  const setData = useApplicationStore((state) => state.setDataResult)

  function runQuery() {
    executeSparqlQuery(query, dbsource)
      .then((response) => {

        if(response && response.data){
          setData(response.data)
          nextStep()
        }
        
    }).catch((error) => {})
  }

  const onChange = React.useCallback((value : any) => {
    setQuery(value)
  }, []);

  useEffect(() => {
    return () => { };
  }, []);

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className=" pb-16 w-full h-full">
      <div className='flex justify-between py-8'>
        <div className='w-1/2'>
          <input
            defaultValue={dbsource}
            onChange={e => setdbSource(e.target.value)}
            className='bg-[#1a1a1a] text-sm py-2 px-2 w-full border-black border-[1px] rounded-lg'>
          </input>
        </div>
        <button
          className='text-xl bg-orange-500 hover:bg-orange-600 transition-all ease-in-out duration-150 px-4 py-2 rounded-xl'
          onClick={() => { runQuery() }}>
          Run
        </button>
      </div>
      <div className='text-xs rounded-md overflow-hidden'>
        <CodeMirror theme={okaidia}
          value={query} height="500px" onChange={e => { onChange(e) }} extensions={[StreamLanguage.define(sparql)]} />
      </div>
    </div>
  );
};

export default QueryInput;
