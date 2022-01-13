import './Header.styles.scss'

export default function Header() {
  return (
    <div className="header">
      <span className="header-title">
        Search{' '}
        <a href="https://giphy.com" target="_blank" rel="noreferrer">
          GIPHY
        </a>
      </span>
    </div>
  )
}
