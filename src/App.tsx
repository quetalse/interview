import {Routes, Route} from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import './App.scss';


const App = () => {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Dashboard/>} />
          </Routes>
      </div>
  )
}

export default App;