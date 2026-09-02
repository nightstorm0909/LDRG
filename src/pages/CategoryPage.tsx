import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { GameCard } from '../components/CategoryCard'
import { SwipeDeck } from '../components/SwipeDeck'
import { gamesInCategory, getCategory } from '../data/catalog'

export function CategoryPage() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const category = categoryId ? getCategory(categoryId) : undefined
  const list = categoryId ? gamesInCategory(categoryId) : []

  if (!category) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <header className="tile tile--hero-band">
        <p className="eyebrow">
          {category.title} · {list.length} {list.length === 1 ? 'game' : 'games'}
        </p>
        <h1>Pick a game.</h1>
      </header>

      <SwipeDeck
        key={category.id}
        items={list}
        label={`${category.title} games`}
        enterLabel="Play"
        getKey={(game) => game.id}
        renderCard={(game) => <GameCard game={game} />}
        onEnter={(game) => navigate(`/play/${game.id}`)}
      />
    </>
  )
}
