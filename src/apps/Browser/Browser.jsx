import { useState } from 'react'
import styles from './Browser.module.css'

const BOOKMARKS = [
  { label: "henryheffernan's portfolio", url: 'https://henryheffernan.com' },
  { label: "Bruno Simon's room", url: 'https://my-room-in-3d.vercel.app/' },
  { label: "Andrew Woan's room", url: 'https://www.sooahs-room-folio.com/' },
  { label: 'GitHub', url: 'https://github.com/toranogix/' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
  { label: 'Three.js', url: 'https://threejs.org' },
]


export default function Browser() {

  // inspo model
  const [input, setInput] = useState('https://henryheffernan.com')
  const [url, setUrl] = useState('https://henryheffernan.com')

  const navigate = (target) => {
    let href = target.trim()
    if (href && !/^https?:\/\//i.test(href)) {
      href = 'https://' + href
    }
    setInput(href)
    setUrl(href)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(input)
  }

  return (
    <div className={styles.browser}>
      {/* Address bar */}
      <form className={styles.bar} onSubmit={handleSubmit}>
        <button type="button" className={styles.navBtn} onClick={() => navigate(url)} title="Refresh">
          ↺
        </button>
        <input
          className={styles.address}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
        <button type="submit" className={styles.navBtn}>Go</button>
      </form>

      {/* Bookmarks bar */}
      <div className={styles.bookmarks}>
        {BOOKMARKS.map((b) => (
          <button
            key={b.url}
            className={styles.bookmark}
            onClick={() => navigate(b.url)}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Iframe */}
      <iframe
        className={styles.iframe}
        src={url}
        title="Browser"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  )
}
