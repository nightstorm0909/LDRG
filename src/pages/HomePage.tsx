import { useNavigate } from 'react-router-dom'
import { CategoryCard } from '../components/CategoryCard'
import { SwipeDeck } from '../components/SwipeDeck'
import { categories } from '../data/catalog'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <header className="tile tile--hero-band">
        <p className="eyebrow">Tonight, two screens</p>
        <h1>Pick a category.</h1>
      </header>

      <SwipeDeck
        items={categories}
        label="Game categories"
        enterLabel="Open"
        getKey={(category) => category.id}
        renderCard={(category) => <CategoryCard category={category} />}
        onEnter={(category) => navigate(`/c/${category.id}`)}
      />
    </>
  )
}
