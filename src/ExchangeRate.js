import React, { useState, useEffect } from 'react';

function ExchangeRate() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [rates, setRates] = useState(null);
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`)
      .then(response => response.json())
      .then(data => {
        setRates(data.rates);
      });
  }, [baseCurrency]);

  useEffect(() => {
    fetch(`https://api.frankfurter.app/currencies`)
      .then(response => response.json())
      .then(data => {
        setCurrencies(data);
      });
  }, []);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  return (
    <div>
      <h2>Exchange Rates</h2>
      <label htmlFor="base-currency-select">Base Currency: 1</label>
      <select id="base-currency-select" value={baseCurrency} onChange={handleBaseCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Currencies</th>
            
          </tr>
        </thead>
        <tbody>
          {rates &&
            Object.keys(rates).map((currency) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{currencies && currencies[currency]}</td>
                <td id="rates">{rates[currency]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangeRate;
