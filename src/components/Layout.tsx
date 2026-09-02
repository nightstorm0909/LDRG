import { Link, Outlet } from 'react-router-dom'
import { BackLink } from './BackLink'
import { NightStatus } from './NightStatus'

export function Layout() {
  return (
    <div className="shell">
      <header className="shell__bar">
        <div className="shell__bar-start">
          <Link className="shell__brand" to="/">
            LDRG
          </Link>
          <BackLink />
        </div>
        <NightStatus />
      </header>
      <main className="shell__content">
        <Outlet />
      </main>
    </div>
  )
}
