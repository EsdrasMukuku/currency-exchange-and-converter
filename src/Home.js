import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ExchangeRate from './ExchangeRate';
import CurrencyConverter from './CurrencyConverter';

function Home() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  useEffect(() => {
    fetch(`https://api.frankfurter.app/currencies`)
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data));
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`)
      .then(response => response.json())
      .then(data => {
        setRates(data.rates);
      });
  }, [baseCurrency]);

  function handleBaseCurrencyChange(event) {
    setBaseCurrency(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value);
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value);
  }

  function handleSwapCurrencies() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return (
    <div className="App">
      <nav>
        <h1>Exchange Rate App</h1>
      </nav>
      <main style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ExchangeRate
          baseCurrency={baseCurrency}
          currencies={currencies}
          rates={rates}
          handleBaseCurrencyChange={handleBaseCurrencyChange}
        />
        <CurrencyConverter
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rates={rates}
          handleAmountChange={handleAmountChange}
          handleFromCurrencyChange={handleFromCurrencyChange}
          handleToCurrencyChange={handleToCurrencyChange}
          handleSwapCurrencies={handleSwapCurrencies}
        />
        
      </main>
      <footer>
        <p>Created by [Esdras Mukuku]</p>
        <nav>
          <a href="file:///C:/Users/esdra/Downloads/iPortfolio/iPortfolio/index.html">Portfolio</a>
          <a href="https://www.linkedin.com/in/esdras-mukuku-006483246/">LinkedIn</a>
          <a href="https://github.com/EsdrasMukuku">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}

export default Home;
