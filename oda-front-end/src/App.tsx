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
    <div className="flex w-full flex-col flex-grow h-full bg-[#1F1F1F]">
      <div className="pt-12 pb-16 h-full px-16">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-white text-3xl font-bold w-full">
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
