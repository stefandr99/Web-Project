import "./App.css";
import { Routes, Route } from "react-router-dom";
import QueryPage from "./components/QueryPage";

function App() {
  return (
    <div className="flex w-full flex-col flex-grow h-full ">
      <div className="pt-12 pb-16 h-full px-16">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-white text-3xl max-h-full font-bold w-full">
                <h1>Open Data Visualizer</h1>
                <QueryPage />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
