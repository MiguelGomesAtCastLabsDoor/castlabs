import React from "react";
//import logo from './logo.svg';
import "./App.css";
import ShoesPage from "./shoes/ShoesPage";
import ShoePage from "./shoes/ShoePage";
import OrdersPage from "./orders/OrdersPage";
import OrderPage from "./orders/OrderPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./home/HomePage";

function App() {
  return (
    <Router>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/shoes" className="button rounded">
          Shoes
        </NavLink>
        <NavLink to="/orders" className="button rounded">
          Orders
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shoes" element={<ShoesPage />} />
          <Route path="/shoes/:id" element={<ShoePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
