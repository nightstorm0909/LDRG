export type IconName = 'heart' | 'spark' | 'grid' | 'type'

export function LineIcon({ name }: { name: IconName }) {
  return (
    <svg
      className="line-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'heart' && (
        <path d="M19.5 12.57 12 20l-7.5-7.43A4.5 4.5 0 1 1 12 6.75a4.5 4.5 0 1 1 7.5 5.82Z" />
      )}
      {name === 'spark' && (
        <>
          <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21" />
          <path d="m6.2 6.2 2.5 2.5M15.3 15.3l2.5 2.5M17.8 6.2l-2.5 2.5M8.7 15.3l-2.5 2.5" />
        </>
      )}
      {name === 'grid' && (
        <>
          <rect x="4" y="4" width="7" height="7" rx="1.2" />
          <rect x="13" y="4" width="7" height="7" rx="1.2" />
          <rect x="4" y="13" width="7" height="7" rx="1.2" />
          <rect x="13" y="13" width="7" height="7" rx="1.2" />
        </>
      )}
      {name === 'type' && (
        <>
          <path d="M5 7h14" />
          <path d="M12 7v10" />
          <path d="M8 17h8" />
        </>
      )}
    </svg>
  )
}
