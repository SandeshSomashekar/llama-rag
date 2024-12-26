import { useState, useEffect, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import sampleQueries from './assets/sampleQueries'
import myReducerState from './components/myReducer.jsx'
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [response, setResponse] = useState('>_')
  const [state, dispatch] = useReducer(myReducerState, {placeholder: ''})
  let [x,y]=[0,0];

  useEffect(()=>{
    (async () => {
      const dat = await fetch('./src/assets/story.json');
      const jsn = await dat.json();
      setData(jsn);
    })();
    initPlaceholder();
  }, []);

  function initPlaceholder() {
    setInterval(()=>{
      if(y === sampleQueries[x].length) {
        y = 0;
        x = (++x < sampleQueries.length) ? x : 0;
      } else {
        y++;
      }
      const cur = sampleQueries[x];
      dispatch({type:'update', placeholder: `Example: ${cur.substring(0, y)}_`})
    },250);
  }

  async function search(event) {
    event.preventDefault();
    setResponse('Analyzing...');
    if(!searchText.trim()){
      return;
    }
    try {
      const data = {query: searchText};
      const response = await axios.post('http://localhost:4001/rag', data);
      setResponse(response.data.content);
    } catch (e) {
      console.error(e);
    }
  }

  function onSearchTextChange(e) {
    setSearchText(e.target.value);
  }

  return (
    <>
      <div class="grid justify-items-center">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Story Analyzer</h1>
      <h4>Analyze simple stories with the help of OpenAI's LLM</h4>

      <form class="max-w-full mx-auto mb-8 mt-8" onSubmit={search}>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" onChange={(e)=>{onSearchTextChange(e)}} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={state.placeholder} required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>

      <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div class="px-3 py-2 border-b dark:border-gray-600">
          <div class="flex flex-wrap items-center">
              <div class="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
                  Response
              </div>
      </div>
      </div>
      <div class="px-4 py-2 min-h-32 bg-white rounded-b-lg dark:bg-gray-800 w-full max-w-96">
          <label for="wysiwyg-history-example" class="sr-only">Publish post</label>
          <div id="wysiwyg-history-example"class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 text-justify">{response}</div>
      </div>
      </div>
      {data.map(d => (
        <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div class="flex flex-col">
            </div>
            <div class="flex flex-col py-3">
                <dd class="text-lg font-semibold">{d.title}</dd>
            </div>  
        </dl>
      ))}
    </>
  )
}

export default App
