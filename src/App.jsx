import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import Detail from "./Components/Detail";
import Cart from "./Components/Cart";
import Default from "./Components/Default";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Modal from "./Components/Modal";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList}></Route>
          <Route path="/details" component={Detail}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route component={Default}></Route>
        </Switch>
        <Modal />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
