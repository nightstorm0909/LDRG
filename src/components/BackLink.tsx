import { Link, useLocation } from 'react-router-dom'
import { getGame } from '../data/catalog'

export function BackLink() {
  const { pathname } = useLocation()

  if (pathname === '/' || pathname === '') {
    return null
  }

  const playId = pathname.match(/^\/play\/([^/]+)/)?.[1]
  const game = playId ? getGame(playId) : undefined

  if (playId) {
    return (
      <Link className="back-link" to={game ? `/c/${game.categoryId}` : '/'}>
        <span aria-hidden="true">←</span>
        Back to games
      </Link>
    )
  }

  if (pathname.startsWith('/night')) {
    return (
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span>
        Back to categories
      </Link>
    )
  }

  if (pathname.startsWith('/c/')) {
    return (
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span>
        Back to categories
      </Link>
    )
  }

  return (
    <Link className="back-link" to="/">
      <span aria-hidden="true">←</span>
      Back
    </Link>
  )
}
