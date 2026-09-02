import { Link } from 'react-router-dom'
import { useRoom } from '../peer/RoomContext'

export function NightStatus() {
  const { status, code } = useRoom()

  if (status === 'connected') {
    return (
      <Link className="night-pill night-pill--ok" to="/night">
        Connected
      </Link>
    )
  }

  if (status === 'waiting') {
    return (
      <Link className="night-pill" to="/night">
        Waiting · {code}
      </Link>
    )
  }

  if (status === 'connecting') {
    return (
      <Link className="night-pill" to="/night">
        Connecting
      </Link>
    )
  }

  return (
    <Link className="night-pill" to="/night">
      Start a night
    </Link>
  )
}
