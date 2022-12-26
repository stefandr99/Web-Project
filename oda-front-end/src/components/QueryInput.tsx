import React, { useEffect, useState } from 'react';
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { sparql } from '@codemirror/legacy-modes/mode/sparql';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { executeSparqlQuery } from '../services/query';



const QueryInput = () => {
  const [dbsource, setdbSource] = useState<any>('')
  const [query, setQuery] = useState<string>('')

  const onChange = React.useCallback((value : any) => {
    setQuery(value)
  }, []);

  useEffect(() => {
    return () => { };
  }, []);

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
          onClick={() => { executeSparqlQuery(query,dbsource) }}>
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
