import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <h1>Welcome</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
