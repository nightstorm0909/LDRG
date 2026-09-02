import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Peer, { type DataConnection } from 'peerjs'
import {
  isRoomMessage,
  normalizeRoomCode,
  randomRoomCode,
  type RoomMessage,
} from './messages'

export type RoomStatus =
  | 'idle'
  | 'connecting'
  | 'waiting'
  | 'connected'
  | 'error'

export type RoomRole = 'host' | 'guest' | null

type RoomContextValue = {
  status: RoomStatus
  role: RoomRole
  code: string
  localName: string
  peerName: string
  error: string
  latencyMs: number | null
  setLocalName: (name: string) => void
  createNight: () => void
  joinNight: (code: string) => void
  leaveNight: () => void
  send: (message: RoomMessage) => void
}

const RoomContext = createContext<RoomContextValue | null>(null)

const NAME_KEY = 'ldrg-name'

function readStoredName(): string {
  try {
    return localStorage.getItem(NAME_KEY) ?? ''
  } catch {
    return ''
  }
}

export function RoomProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<RoomStatus>('idle')
  const [role, setRole] = useState<RoomRole>(null)
  const [code, setCode] = useState('')
  const [localName, setLocalNameState] = useState(() => readStoredName())
  const [peerName, setPeerName] = useState('')
  const [error, setError] = useState('')
  const [latencyMs, setLatencyMs] = useState<number | null>(null)

  const peerRef = useRef<Peer | null>(null)
  const connRef = useRef<DataConnection | null>(null)
  const pingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const nameRef = useRef(localName)
  nameRef.current = localName

  const stopPing = useCallback(() => {
    if (pingRef.current) {
      clearInterval(pingRef.current)
      pingRef.current = null
    }
  }, [])

  const teardown = useCallback(() => {
    stopPing()
    connRef.current?.close()
    connRef.current = null
    peerRef.current?.destroy()
    peerRef.current = null
  }, [stopPing])

  const send = useCallback((message: RoomMessage) => {
    if (connRef.current?.open) {
      connRef.current.send(message)
    }
  }, [])

  const startPing = useCallback(() => {
    stopPing()
    pingRef.current = setInterval(() => {
      send({ type: 'ping', t: Date.now() })
    }, 4000)
  }, [send, stopPing])

  const attachConnection = useCallback(
    (conn: DataConnection, asRole: RoomRole) => {
      connRef.current = conn
      let opened = false
      const onOpen = () => {
        if (opened) {
          return
        }
        opened = true
        conn.send({
          type: 'hello',
          name: nameRef.current.trim() || (asRole === 'host' ? 'Host' : 'Guest'),
        })
        setStatus('connected')
        setError('')
        startPing()
      }
      conn.on('open', onOpen)
      if (conn.open) {
        onOpen()
      }
      conn.on('data', (raw) => {
        if (!isRoomMessage(raw)) {
          return
        }
        if (raw.type === 'hello') {
          setPeerName(raw.name)
        }
        if (raw.type === 'ping') {
          conn.send({ type: 'pong', t: raw.t })
        }
        if (raw.type === 'pong') {
          setLatencyMs(Math.max(0, Date.now() - raw.t))
        }
      })
      conn.on('close', () => {
        stopPing()
        connRef.current = null
        setPeerName('')
        setLatencyMs(null)
        if (asRole === 'host' && peerRef.current && !peerRef.current.destroyed) {
          setStatus('waiting')
        } else if (asRole === 'guest') {
          setStatus('error')
          setError('The other person left. Join again with the same code if they are still hosting.')
        }
      })
      conn.on('error', () => {
        setStatus('error')
        setError('The connection dropped. Try leaving and joining again.')
      })
    },
    [startPing, stopPing],
  )

  const createNight = useCallback(() => {
    teardown()
    const nextCode = randomRoomCode()
    setCode(nextCode)
    setRole('host')
    setPeerName('')
    setLatencyMs(null)
    setError('')
    setStatus('connecting')

    const peer = new Peer(nextCode)
    peerRef.current = peer
    peer.on('open', () => {
      setStatus('waiting')
    })
    peer.on('connection', (conn) => {
      if (connRef.current?.open) {
        conn.close()
        return
      }
      attachConnection(conn, 'host')
    })
    peer.on('error', (err) => {
      setStatus('error')
      setError(
        err.type === 'unavailable-id'
          ? 'That night code was taken. Create again for a new code.'
          : 'Could not start a night. Check your network and try again.',
      )
    })
  }, [attachConnection, teardown])

  const joinNight = useCallback(
    (rawCode: string) => {
      const nextCode = normalizeRoomCode(rawCode)
      if (nextCode.length !== 6) {
        setError('Enter the 6-character code from your partner.')
        setStatus('error')
        return
      }
      teardown()
      setCode(nextCode)
      setRole('guest')
      setPeerName('')
      setLatencyMs(null)
      setError('')
      setStatus('connecting')

      const peer = new Peer()
      peerRef.current = peer
      peer.on('open', () => {
        const conn = peer.connect(nextCode, { reliable: true })
        attachConnection(conn, 'guest')
      })
      peer.on('error', (err) => {
        setStatus('error')
        setError(
          err.type === 'peer-unavailable'
            ? 'No night found for that code. Ask them to create one and wait on the code screen.'
            : 'Could not join. Check the code and your network.',
        )
      })
    },
    [attachConnection, teardown],
  )

  const leaveNight = useCallback(() => {
    teardown()
    setStatus('idle')
    setRole(null)
    setCode('')
    setPeerName('')
    setLatencyMs(null)
    setError('')
  }, [teardown])

  const setLocalName = useCallback((name: string) => {
    setLocalNameState(name)
    try {
      localStorage.setItem(NAME_KEY, name)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({
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
      send,
    }),
    [
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
      send,
    ],
  )

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
}

export function useRoom() {
  const value = useContext(RoomContext)
  if (!value) {
    throw new Error('useRoom must be used inside RoomProvider')
  }
  return value
}
