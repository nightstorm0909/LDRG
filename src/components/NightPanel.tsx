import { useState } from 'react'
import { useRoom } from '../peer/RoomContext'

export function NightPanel() {
  const {
    status,
    role,
    code,
    localName,
    peerName,
    error,
    latencyMs,
    setLocalName,
    createNight,
    joinNight,
    leaveNight,
  } = useRoom()
  const [joinCode, setJoinCode] = useState('')
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const you = localName.trim() || (role === 'guest' ? 'Guest' : 'You')

  return (
    <section className="tile night">
      <p className="stub__kicker">Shared night</p>
      <h2>Play in the same room</h2>
      <p className="night__lede">
        One person creates a night and keeps this tab open. The other joins
        with the code. Stay connected while you pick games.
      </p>

      {status === 'idle' || status === 'error' ? (
        <form
          className="night__form"
          onSubmit={(event) => {
            event.preventDefault()
            joinNight(joinCode)
          }}
        >
          <label className="night__field">
            Your name
            <input
              value={localName}
              onChange={(event) => setLocalName(event.target.value)}
              placeholder="Optional"
              maxLength={24}
              autoComplete="nickname"
            />
          </label>
          <div className="night__actions">
            <button type="button" className="night__btn night__btn--primary" onClick={createNight}>
              Create a night
            </button>
          </div>
          <label className="night__field">
            Partner’s code
            <input
              value={joinCode}
              onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              autoCapitalize="characters"
              spellCheck={false}
            />
          </label>
          <button type="submit" className="night__btn">
            Join night
          </button>
          {status === 'error' && error ? <p className="night__error">{error}</p> : null}
        </form>
      ) : null}

      {status === 'connecting' ? (
        <p className="night__status">Connecting… keep this tab open.</p>
      ) : null}

      {status === 'waiting' ? (
        <div className="night__waiting">
          <p className="night__status">
            Waiting for {you === 'You' ? 'your partner' : 'them'} to join.
          </p>
          <p className="night__code" aria-label="Night code">
            {code}
          </p>
          <div className="night__actions">
            <button type="button" className="night__btn night__btn--primary" onClick={() => void copyCode()}>
              {copied ? 'Copied' : 'Copy code'}
            </button>
            <button type="button" className="night__btn" onClick={leaveNight}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {status === 'connected' ? (
        <div className="night__connected">
          <p className="night__status night__status--ok">
            Connected{peerName ? ` with ${peerName}` : ''}.
            {latencyMs !== null ? ` Ping ${latencyMs} ms.` : ''}
          </p>
          <p className="night__code night__code--small">{code}</p>
          <button type="button" className="night__btn" onClick={leaveNight}>
            Leave night
          </button>
        </div>
      ) : null}
    </section>
  )
}
