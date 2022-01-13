import './SearchBar.styles.scss'

export default function SearchBar({ setInput, getInput }) {
  return (
    <>
      <input
        className="search-bar"
        type="search"
        placeholder={setInput}
        onChange={getInput} // add lodash to the handle change function
        autoFocus
        required
      />
    </>
  )
}
