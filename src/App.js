import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import ProductProfile from "./components/ProductProfile";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/productfile" element={<ProductProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
