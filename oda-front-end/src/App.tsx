import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import QueryInput from './components/QueryInput';

function App() {
  const [currentlyOpenedMovie, setCurrentlyOpenedMovie] = useState<any>({});
  const navigate = useNavigate();

  return (
    <div className="flex w-screen flex-col h-screen bg-[#1F1F1F]">
      <div className="h-[800px] pt-24 pb-16 flex px-36">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-white text-3xl font-bold">
                <h1>Open Data Visualizer</h1>
                <QueryInput />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
