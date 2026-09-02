import { Navigate, useParams } from 'react-router-dom'
import { GameStub } from '../games/GameStub'
import { getCategory, getGame } from '../data/catalog'

export function PlayPage() {
  const { gameId } = useParams()
  const game = gameId ? getGame(gameId) : undefined
  const category = game ? getCategory(game.categoryId) : undefined

  if (!game || !category) {
    return <Navigate to="/" replace />
  }

  return <GameStub game={game} category={category} />
}
