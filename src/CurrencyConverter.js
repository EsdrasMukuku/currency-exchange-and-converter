import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { ArrowLeftRight } from "react-bootstrap-icons";


import "./CurrencyConverter.css";




const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);
  
  


  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConversion = () => {
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[toCurrency];
        setConvertedAmount(amount * rate);
        setRate(rate);
      })
      .catch((error) => console.log(error));
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((response) => response.json())
      .then((data) => {
        const currencyKeys = Object.keys(data);
        setCurrencies(currencyKeys);
        setFromCurrency(currencyKeys[0]);
        setToCurrency(currencyKeys[1]);
      })
      .catch((error) => console.log(error));
  }, []);

  



  return (
    <div className="currency-converter">
     <h2>Currency Converter</h2>
      <div className="form-container">
       <div className="form-group">
        <label htmlFor="amount">Amount</label>
         <input type="number" id="amount" value={amount} onChange={handleAmountChange} style={{width: "150px", height: "35px"}}/>
       </div>
       <div className="form-group">
        <label htmlFor="from-currency">From </label>
          <select id="from-currency" value={fromCurrency} onChange={handleFromCurrencyChange}>
    {currencies.map((currency) => (
         <option key={currency} value={currency}>
          {currency}
         </option>
    ))}
         </select>
       </div>
        <button onClick={handleSwapCurrencies} style={{height:"60px", width: "60px"}} id="button1"><ArrowLeftRight color="white" size={25} width={25} height={25} bottom={25}/>
        </button>
       <div className="form-group">
        <label htmlFor="to-currency">To </label>
          <select id="to-currency" value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
             {currency}
            </option>
    ))}
         </select>
       </div>
       <div className="conversion-result">
       <span>
        <h6>
         {amount} {fromCurrency} = {rate.toFixed(2)} {toCurrency}
        </h6>
        <h6>Exchange Rate: 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</h6>
      </span>
    
        </div>
    
       <button onClick={handleConversion} id="button2">Convert</button>
    
   
    
      </div>
     </div>
   
    
    
    
    );
    };
    
    export default CurrencyConverter;