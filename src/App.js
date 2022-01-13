import { useState, useCallback, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'

import Header from './components/Header/Header'
import Input from './components/Input/Input'
import ResultsContainer from './components/ResultsContainer/ResultsContainer'

import './App.css'

const GIF_URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
const RANDOM_GIF_URL = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [offset, setOffset] = useState(0)

  const fetchData = useCallback(
    async (input) => {
      // get 3 random gifs
      if (!input) {
        const result = []
        for (let i = 0; i < 3; i++) {
          const res = await fetch(RANDOM_GIF_URL)
          const json = await res.json()
          result.push(json.data)
        }
        setResults(result)
        return
      }

      // fetch search query
      const res = await fetch(`${GIF_URL}&q=${input}&limit=10&offset=${offset}`)
      if (res.status === 429) {
        console.error('Too many API requests')
      }
      const json = await res.json()
      setResults(json.data)
    },
    [offset]
  )

  useEffect(() => {
    fetchData(searchParams.get('q'))
  }, [fetchData, searchParams])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [offset])

  useEffect(() => {
    setOffset(0)
  }, [searchParams])

  const getInput = useCallback((e) => {
    e.preventDefault()
    let params = { q: e.target.value }
    setSearchParams(params)
    // inputRef.current(e.target.value)
  }, [setSearchParams])

  const debouncedGetInput = useMemo(() => _.debounce(getInput, 500), [getInput])

  const nextTen = (e) => {
    e.preventDefault()
    setOffset(offset + 10)
  }

  const prevTen = (e) => {
    e.preventDefault()
    setOffset(offset - 10)
  }

  return (
    <div className="App">
      <Header />
      <Input getInput={debouncedGetInput} setInput={searchParams.get('q')} />
      <ResultsContainer
        results={results}
        nextTen={nextTen}
        prevTen={prevTen}
        offset={offset}
      />
    </div>
  )
}

export default App
