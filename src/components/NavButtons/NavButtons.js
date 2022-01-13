import './NavButtons.styles.scss'

export default function NavButtons({ nextTen, prevTen, offset }) {
  return (
    <div className="button-container">
      {offset === 0 ? (
        ''
      ) : (
        <button onClick={prevTen}>Previous 10 Results</button>
      )}
      <button onClick={nextTen}>Next 10 Results</button>
    </div>
  )
}
