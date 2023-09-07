import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const apiKey = "A42Y6nel30/KxXYBml+s9A==CFKrp5TVUt8uQl8h";

const list = ['age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude', 'beauty', 'best', 'birthday', 'business'];
const mainColors = ['red', 'blue', 'green', 'orange', 'purple', '#902C3E', 'teal', 'brown', 'gray'];

function randomColor() {
  const randomIndex = Math.floor(Math.random() * mainColors.length);
  return randomIndex;
}

function App() {

  const [state, setState] = useState([])
  const [colorIndex, setColorIndex] = useState(0);


  useEffect(() => clickHandler, [])
  useEffect(() => setColorIndex(randomColor()), [state])
  useEffect(() => {
    document.body.style.backgroundColor = mainColors[colorIndex];
  }, [colorIndex]);

  function fetchQuote() {
    const randomCat = Math.floor(Math.random() * list.length)
    const category = list[randomCat]
    return axios.get('https://api.api-ninjas.com/v1/quotes?category=' + category, {
      headers: { 'X-Api-Key': apiKey }
    })
      .then(response => {
        setState(response.data[0]);
      })
      .catch(error => {
        console.error('Request failed:', error)
      })
  }


  const clickHandler = () => {
    fetchQuote();
    setColorIndex(randomColor());
  }

  const btnStyles = {
    backgroundColor: mainColors[colorIndex],
    color: "white",
  }
  const fontStyles = { color: mainColors[colorIndex] }


  return (

    <div id="quote-box"  >
      <p
        id='text'
        style={fontStyles}>
        <i className="fa fa-quote-left"> </i>
        {state.quote ? " " + state.quote : ""}
      </p>
      <p
        id='author'
        style={fontStyles}>
        {state.author ? `- ` + state.author : ''}
      </p>
      <div className='bottom-line'>
        <a id="tweet-quote"
          href='https://twitter.com/intent/tweet'
          target="_blank"
          style={btnStyles}>
          <i style={{ color: "white" }} className="fab fa-twitter"></i>
        </a>
        <button id="new-quote"
          style={btnStyles}
          onClick={clickHandler}>
          New Quote
        </button>
      </div>
    </div >
  )
}

export default App
