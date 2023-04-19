import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import ExchangeRate from './ExchangeRate';
import CurrencyConverter from './CurrencyConverter';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/exchange-rate">Exchange Rate</Link>
            </li>
            <li className="nav-item">
              <Link to="/currency-converter">Currency Converter</Link>
            </li>
          </ul>
        </nav>
        

        <Switch>
          
          <Route path="/exchange-rate">
            <ExchangeRate />
          </Route>
          <Route path="/currency-converter">
            <CurrencyConverter />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      
    </Router>
  );
}
