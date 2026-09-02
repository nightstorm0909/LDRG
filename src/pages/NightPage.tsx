import { NightPanel } from '../components/NightPanel'

export function NightPage() {
  return (
    <>
      <header className="tile tile--hero-band">
        <p className="eyebrow">Two tabs · one code</p>
        <h1>Open a night together.</h1>
      </header>
      <div className="night-page">
        <NightPanel />
      </div>
    </>
  )
}
