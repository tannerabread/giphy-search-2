import './Input.styles.scss'

import SearchBar from '../SearchBar/SearchBar'
import Dropdown from '../Dropdown/Dropdown'

export default function Input({ getInput, setInput, getPrevious }) {
  return (
    <div className="input-container">
      <SearchBar getInput={getInput} setInput={setInput} />
      <Dropdown onChange={getPrevious} />
    </div>
  )
}
