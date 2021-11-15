import {Routes, Route} from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import './App.scss';
import Result from "./screens/Result";


const App = () => {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/results/:id" element={<Result/>} />
          </Routes>
      </div>
  )
}

export default App;