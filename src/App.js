import './App.css';
import AddTask from './Components/AddTask';
import Home1 from './Components/Home/Home1';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home1 />}></Route>
            <Route exact path="/add" element={<AddTask />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
