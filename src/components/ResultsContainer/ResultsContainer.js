import './ResultsContainer.styles.scss'

import Grid from '../Grid/Grid'
import NavButtons from '../NavButtons/NavButtons'

export default function ResultsContainer({
  results,
  nextTen,
  prevTen,
  offset,
}) {
  if (results.length === 3) return <Grid items={results} />
  return (
    <div className="results-container">
      <NavButtons nextTen={nextTen} prevTen={prevTen} offset={offset} />
      <Grid items={results} />
      <NavButtons nextTen={nextTen} prevTen={prevTen} offset={offset} />
    </div>
  )
}
