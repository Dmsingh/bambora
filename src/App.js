import logo from './logo.svg';
import {useState,useEffect} from 'react'
import './App.css';
import Checkout from '../src/components/checkout'; 
import Card from './components/payment/card';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
localStorage.setItem('mode','checkout')
const initmode=localStorage.getItem('mode')

function App() {
const[mode,setmode]=useState(initmode)
useEffect(() => {
  
// return setmode(localStorage.setItem('mode'))
  
}, [])


  return (
     <BrowserRouter>
    <div className="App">

    <Routes>
      
      <Route path="/" element={<Checkout />} />
      <Route path="payment" element={<Card />} />
    </Routes>
    </div>

  </BrowserRouter>
 


    
    
  );
}

export default App;
