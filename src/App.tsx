import {Routes, Route} from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import './App.scss';
import Result from "./screens/Result";
import Finalize from "./screens/Finalize";


const App = () => {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/results/:id" element={<Result/>} />
              <Route path="/finalize/:id" element={<Finalize/>} />
          </Routes>
      </div>
  )
}

export default App;