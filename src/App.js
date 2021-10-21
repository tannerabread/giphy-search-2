// TODO: show error for API limit
// TODO-styling: Make Cards work correctly in Grid
// TODO-styling: add some color

import React, { useState, useEffect, useRef, useCallback } from 'react'
import _ from 'lodash'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'


const App = () => {
  
  return (
    <div className="App">
      <Router>
        <Route path="/" component={SearchPage} />
      </Router>
    </div>
  )
}


const GIF_URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
const RANDOM_GIF_URL = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`


const SearchPage = ({ location }) => {
  const query = location.search.substring(location.search.indexOf("=") + 1)
  
  const [input, setInput] = useState(query || '')
  const [results, setResults] = useState([])
  const [history, setHistory] = useState(() => {
    const saved = sessionStorage.getItem(query)
    const initialValue = JSON.parse(saved)
    if (initialValue) setResults(initialValue)
    return initialValue || ""
  })
  const inputRef = useRef()

  // fetch search terms asynchronously
  const fetchData = useCallback(async (input) => {
    if (!input) {
      const result = []
      for (let i=0; i<3; i++) {
        const res = await fetch(RANDOM_GIF_URL)
        const json = await res.json()
        result.push(json.data)
      }
      setResults(result)
      return
    }

    const res = await fetch(`${GIF_URL}&q=${input}`)
    const json = await res.json()

    setResults(json.data)
    setHistory(input)

    const saveResult = json.data.map(({ id, url, images: { fixed_height: { mp4 } } }) => 
                                      ({ id, url, images: { fixed_height: { mp4 } } }))
    sessionStorage.setItem(input, JSON.stringify(saveResult))
  }, [])

  
  useEffect(() => {
    // don't fetch new data if query exists in history
    if (history !== "") { return }

    // fetch new data if new query
    fetchData(query)
  }, [fetchData, query, history])


  // use debounce to not call API on every key stroke
  // results will show 1 second after user ends typing
  useEffect(() => {
    inputRef.current = _.debounce(fetchData, 1000)

  }, [fetchData])


  // set input to current value in search bar and then set inputRef to the same
  const handleChange = (event) => {
    const input = event.target.value
    setInput(input)
    inputRef.current(input)
  }

  return (
    <>
      <div className="App-header">
        <p>
          Search <a href="https://giphy.com/">GIPHY</a>
        </p>
      </div>
      <div className="Container">
        <div className="InputContainer">
          <form onSubmit={() => fetchData(input)}>  
            <input type="text" 
                    id="search" 
                    name="search" 
                    placeholder="Search..." 
                    value={input}
                    onChange={handleChange}
                    className="SearchBar" 
                    required />
            <label htmlFor="search">Press enter to Search or wait 1 second for results to show up automatically</label>
            <input type="submit" className="HiddenSubmit" />
          </form>
        </div>
        <Search results={results} />
      </div>
    </>
  )
}


// Search component to abstract away the results display from the main class
const Search = ({ results }) => {
  const [number, setNumber] = useState(0)

  if (results.length === 0) return <div>Please enter a search</div>

  return (
    <div className="ResultsContainer">
      <ul className="Grid">
        {results.slice(number, number+10).map(result => (
          <li key={result.id} className="Card">
            <video autoPlay="autoplay" loop="loop" >
              <source src={result.images.fixed_height.mp4} type="video/mp4" />
            </video>
            <button onClick={() => {navigator.clipboard.writeText(result.url)}}>
              Click here to copy GIPHY url
            </button>
          </li>
          )
        )}
      </ul>
      <div className="ButtonContainer">
        {number >= 10 ? <button onClick={() => setNumber(number - 10)}>Previous 10 results</button> : ''}
        {number < 40 ? <button onClick={() => setNumber(number + 10)}>Next 10 results</button> : ''}
      </div>
    </div>
  )
}

export default App