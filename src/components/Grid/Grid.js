import './Grid.styles.scss'

export default function Grid({ items }) {
  return (
    <ul className="grid">
      {items?.map((item) => (
        <li key={item.id} className="card">
          <video className="gif" autoPlay loop muted playsInline>
            <source src={item.images.original_mp4.mp4} type="video/mp4" />
          </video>
          <button
            className="copy-button"
            onClick={() => {
              navigator.clipboard.writeText(item.url)
            }}
          >
            <strong>Copy GIF URL</strong>
          </button>
        </li>
      ))}
    </ul>
  )
}
