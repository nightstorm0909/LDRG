import type { Game } from '../data/catalog'

export function WouldYouRatherPreview() {
  return (
    <div className="preview-split" aria-hidden="true">
      <div className="preview-choice">Stay in and cook</div>
      <span>or</span>
      <div className="preview-choice">Go out walking</div>
    </div>
  )
}

export function ThisOrThatPreview() {
  return (
    <div className="preview-split" aria-hidden="true">
      <div className="preview-choice">Coffee</div>
      <span>or</span>
      <div className="preview-choice">Tea</div>
    </div>
  )
}

export function TwoTruthsPreview() {
  return (
    <ol className="preview-list" aria-hidden="true">
      <li>I once missed a flight on purpose.</li>
      <li>I can still recite our first playlist.</li>
      <li>I have never eaten mango.</li>
    </ol>
  )
}

export function NeverHaveIEverPreview() {
  return (
    <div className="preview-prompt" aria-hidden="true">
      <p>Never have I ever fallen asleep on a video call.</p>
      <div className="preview-split">
        <div className="preview-choice">I have</div>
        <div className="preview-choice">I have not</div>
      </div>
    </div>
  )
}

export function TicTacToePreview() {
  return (
    <div className="preview-ttt" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="preview-ttt__cell">
          {i === 0 ? 'X' : i === 4 ? 'O' : ''}
        </span>
      ))}
    </div>
  )
}

export function ConnectFourPreview() {
  return (
    <div className="preview-c4" aria-hidden="true">
      {Array.from({ length: 42 }, (_, i) => (
        <span
          key={i}
          className={
            i === 38 || i === 39 || i === 32
              ? 'preview-c4__cell preview-c4__cell--a'
              : i === 40 || i === 33
                ? 'preview-c4__cell preview-c4__cell--b'
                : 'preview-c4__cell'
          }
        />
      ))}
    </div>
  )
}

export function HangmanPreview() {
  return (
    <div className="preview-hang" aria-hidden="true">
      <p className="preview-hang__word">
        {['L', '_', 'V', 'E'].map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </p>
      <p className="preview-hang__letters">A B C D E F G H …</p>
    </div>
  )
}

export function GamePreview({ gameId }: { gameId: Game['id'] }) {
  switch (gameId) {
    case 'would-you-rather':
      return <WouldYouRatherPreview />
    case 'this-or-that':
      return <ThisOrThatPreview />
    case 'two-truths':
      return <TwoTruthsPreview />
    case 'never-have-i-ever':
      return <NeverHaveIEverPreview />
    case 'tic-tac-toe':
      return <TicTacToePreview />
    case 'connect-four':
      return <ConnectFourPreview />
    case 'hangman':
      return <HangmanPreview />
    default:
      return null
  }
}
