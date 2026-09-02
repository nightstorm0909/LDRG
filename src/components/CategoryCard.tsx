import { LineIcon } from './LineIcon'
import type { Category, Game } from '../data/catalog'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className={`swipe-face swipe-face--${category.tone}`}>
      <LineIcon name={category.icon} />
      <p className="swipe-face__kind">Category</p>
      <h2>{category.title}</h2>
      <p>{category.blurb}</p>
    </div>
  )
}

export function GameCard({ game }: { game: Game }) {
  return (
    <div className={`swipe-face swipe-face--${game.tone}`}>
      <p className="swipe-face__kind">Game · {game.players} players</p>
      <h2>{game.title}</h2>
      <p>{game.blurb}</p>
    </div>
  )
}
