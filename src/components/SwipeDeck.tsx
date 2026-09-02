import {
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

const THRESHOLD = 72
const CLICK_SLOP = 8

type SwipeDeckProps<T> = {
  items: T[]
  label: string
  enterLabel: string
  getKey: (item: T) => string
  renderCard: (item: T) => ReactNode
  onEnter: (item: T) => void
}

export function SwipeDeck<T>({
  items,
  label,
  enterLabel,
  getKey,
  renderCard,
  onEnter,
}: SwipeDeckProps<T>) {
  const [index, setIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [exit, setExit] = useState<'left' | 'right' | null>(null)
  const startX = useRef(0)
  const startY = useRef(0)
  const dragXRef = useRef(0)
  const dragging = useRef(false)
  const lock = useRef<'h' | 'v' | null>(null)
  const busy = useRef(false)

  const n = items.length
  const current = items[index]
  const prev = n > 1 ? items[(index - 1 + n) % n] : undefined
  const next = n > 1 ? items[(index + 1) % n] : undefined

  const reduceMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const goRelative = useCallback(
    (step: -1 | 1) => {
      if (n < 2 || busy.current) {
        return
      }
      setIndex((i) => (i + step + n) % n)
    },
    [n],
  )

  const settle = useCallback(
    (dir: 'left' | 'right') => {
      if (!current || busy.current || items.length === 0) {
        return
      }
      busy.current = true
      const wait = reduceMotion() ? 0 : 220
      setExit(dir)
      window.setTimeout(() => {
        if (dir === 'left') {
          setIndex((i) => (i + 1) % items.length)
        } else {
          onEnter(current)
        }
        dragXRef.current = 0
        setDragX(0)
        setExit(null)
        busy.current = false
      }, wait)
    },
    [current, items.length, onEnter],
  )

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('button, a, input, textarea')
      ) {
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        settle('left')
      }
      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        event.preventDefault()
        settle('right')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [settle])

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (busy.current || event.button !== 0) {
      return
    }
    const slot = (event.target as HTMLElement)
      .closest('[data-slot]')
      ?.getAttribute('data-slot')
    if (slot === 'prev' || slot === 'next') {
      return
    }
    dragging.current = true
    lock.current = null
    startX.current = event.clientX
    startY.current = event.clientY
    dragXRef.current = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) {
      return
    }
    const dx = event.clientX - startX.current
    const dy = event.clientY - startY.current
    if (!lock.current) {
      if (Math.abs(dx) < CLICK_SLOP && Math.abs(dy) < CLICK_SLOP) {
        return
      }
      lock.current = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
    }
    if (lock.current === 'v') {
      return
    }
    event.preventDefault()
    dragXRef.current = dx
    setDragX(dx)
  }

  function onPointerUp() {
    if (!dragging.current) {
      return
    }
    dragging.current = false
    const dx = dragXRef.current
    if (lock.current === 'h') {
      if (dx <= -THRESHOLD) {
        settle('left')
      } else if (dx >= THRESHOLD) {
        settle('right')
      } else {
        dragXRef.current = 0
        setDragX(0)
      }
    } else if (lock.current === null && Math.abs(dx) < CLICK_SLOP) {
      settle('right')
    } else {
      dragXRef.current = 0
      setDragX(0)
    }
    lock.current = null
  }

  if (!current) {
    return null
  }

  const hint =
    dragX > 28 ? enterLabel : dragX < -28 ? 'Next' : null

  const slots: { item: T; slot: 'prev' | 'current' | 'next' }[] = []
  if (prev) {
    slots.push({ item: prev, slot: 'prev' })
  }
  if (next) {
    slots.push({ item: next, slot: 'next' })
  }
  slots.push({ item: current, slot: 'current' })

  return (
    <section className="swipe" aria-label={label}>
      <p className="swipe__hint">
        Click the center card or swipe right to {enterLabel.toLowerCase()}.
        Click a side card, swipe left, or press ← to browse.
      </p>
      <div
        className="swipe__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {slots.map(({ item, slot }) => {
          const isFront = slot === 'current'
          const fly =
            isFront && exit === 'left'
              ? 'swipe__card--out-left'
              : isFront && exit === 'right'
                ? 'swipe__card--out-right'
                : ''
          const style =
            isFront && !exit
              ? {
                  transform: `translateX(calc(-50% + ${dragX}px)) rotate(${dragX / 36}deg)`,
                  transition: dragging.current ? 'none' : 'transform 0.18s ease',
                }
              : undefined

          return (
            <article
              key={`${getKey(item)}-${slot}`}
              data-slot={slot}
              className={`tile swipe__card swipe__card--${slot} ${fly}`}
              style={style}
              aria-hidden={!isFront}
              onClick={
                slot === 'prev'
                  ? () => goRelative(-1)
                  : slot === 'next'
                    ? () => goRelative(1)
                    : undefined
              }
            >
              {isFront && hint ? (
                <span
                  className={`swipe__badge swipe__badge--${hint === 'Next' ? 'next' : 'enter'}`}
                >
                  {hint}
                </span>
              ) : null}
              {renderCard(item)}
            </article>
          )
        })}
      </div>
    </section>
  )
}
