import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const list = ['age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude', 'beauty', 'best', 'birthday', 'business'];

function randomCat() {
  return Math.floor(Math.random() * list.length);
}

const apiKey = "qxZ7U0oPzXfxaqwMCOhQIQ==zwNXkcSrD8Gd8d6j";
const category = list[randomCat()]


function App() {
  const [state, setState] = useState([])

  const clickHandler = () => {
    axios.get('https://api.api-ninjas.com/v1/quotes?category=' + category, {
      headers: { 'X-Api-Key': apiKey }
    })
      .then(response => {
        setState(response.data);
      })
      .catch(error => {
        console.error('Request failed:', error);
      });
  }

  useEffect(() => {
    return clickHandler;
  }, []);

  return (
    <>
      <div id="quote-box">

        <p id='text'>
          {state.length > 0 ? `"` + state[0].quote : '"'}
        </p>
        <p id='author'>
          {state.length > 0 ? `- ` + state[0].author : ''}
          {state.length > 0 ? `- ` + state[0].category : ''}
        </p>
        <button id="new-quote" onClick={clickHandler}>
          New Quote
        </button>
      </div>
    </>
  )
}

export default App
