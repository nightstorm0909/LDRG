import { Link } from 'react-router-dom'
import type { Category, Game } from '../data/catalog'
import { useRoom } from '../peer/RoomContext'
import { GamePreview } from './previews'

export function GameStub({
  game,
  category,
}: {
  game: Game
  category: Category
}) {
  const { status, peerName } = useRoom()
  const linked = status === 'connected'

  return (
    <article className="stub">
      <header className="tile tile--hero-band">
        <p className="eyebrow">
          {category.title} · {game.players} players
          {linked ? ' · live with partner' : ''}
        </p>
        <h1>{game.title}</h1>
        <p className="stub__lede">{game.blurb}</p>
      </header>

      <div className="stub__grid">
        <section className="tile stub__preview" aria-label="Preview">
          <p className="stub__kicker">Preview</p>
          <GamePreview gameId={game.id} />
          <p className="stub__muted">
            {linked
              ? `You are connected${peerName ? ` with ${peerName}` : ''}. Shared moves land in the next phase.`
              : 'The board will sync after you both join a night.'}
          </p>
        </section>

        <section className="tile stub__rules">
          <p className="stub__kicker">How it works</p>
          <ol>
            {game.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {!linked ? (
            <p className="play-note">
              Open <Link to="/night">Start a night</Link> in two browsers (or
              your laptop and theirs). Create on one side, join with the code
              on the other. You should both see Connected.
            </p>
          ) : (
            <p className="play-note">
              You are in the same night. Synced play for this game is next.
            </p>
          )}
          <Link className="back-link back-link--inline" to={`/c/${category.id}`}>
            <span aria-hidden="true">←</span>
            Back to games
          </Link>
        </section>
      </div>
    </article>
  )
}
