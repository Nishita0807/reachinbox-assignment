import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Onebox from "./Components/Onebox";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/onebox" element={<Onebox/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
