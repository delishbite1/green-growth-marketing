interface Props {
  className?: string
  textColor?: 'dark' | 'white'
}

export default function LogoSVG({ className = 'h-12', textColor = 'dark' }: Props) {
  const textFill = textColor === 'white' ? '#ffffff' : '#1a5c1a'
  const subFill = textColor === 'white' ? '#a3d9a5' : '#6b7280'

  return (
    <svg
      viewBox="0 0 220 90"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Green Growth Marketing logo"
    >
      <defs>
        <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dc242" />
          <stop offset="100%" stopColor="#3a8a2d" />
        </linearGradient>
        <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8bd14e" />
          <stop offset="100%" stopColor="#4a9e32" />
        </linearGradient>
        <linearGradient id="barGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9adb5a" />
          <stop offset="100%" stopColor="#56b03c" />
        </linearGradient>
        <linearGradient id="swooshGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e5c1e" />
          <stop offset="60%" stopColor="#3a8a2d" />
          <stop offset="100%" stopColor="#5cb83e" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5cb83e" />
          <stop offset="100%" stopColor="#7dc242" />
        </linearGradient>
        <linearGradient id="leafGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a8e063" />
          <stop offset="100%" stopColor="#4a9e32" />
        </linearGradient>
        <linearGradient id="leafGrad2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b5e874" />
          <stop offset="100%" stopColor="#56b03c" />
        </linearGradient>
      </defs>

      {/* === BARS === */}
      {/* Bar 1 - shortest */}
      <rect x="18" y="46" width="13" height="22" rx="2" fill="url(#barGrad1)" />
      {/* Bar 2 - medium */}
      <rect x="36" y="33" width="13" height="35" rx="2" fill="url(#barGrad2)" />
      {/* Bar 3 - tallest */}
      <rect x="54" y="16" width="13" height="52" rx="2" fill="url(#barGrad3)" />

      {/* === SWOOSH ARC === */}
      <path
        d="M 12 74 C 20 82, 35 84, 52 76 C 68 68, 78 55, 88 44"
        stroke="url(#swooshGrad)"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* === ARROW HEAD === */}
      <polygon points="88,36 100,48 78,52" fill="url(#arrowGrad)" />

      {/* === LEAVES === */}
      {/* Left leaf */}
      <ellipse cx="57" cy="9" rx="6" ry="11" fill="url(#leafGrad1)" transform="rotate(-25, 57, 9)" />
      {/* Right leaf */}
      <ellipse cx="67" cy="7" rx="5" ry="9" fill="url(#leafGrad2)" transform="rotate(20, 67, 7)" />
      {/* Stem */}
      <line x1="61" y1="16" x2="61" y2="8" stroke="#3a8a2d" strokeWidth="1.5" strokeLinecap="round" />

      {/* === TEXT === */}
      {/* "Green Growth" */}
      <text
        x="108"
        y="46"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="bold"
        fill={textFill}
        letterSpacing="-0.3"
      >
        Green Growth
      </text>

      {/* Dash - MARKETING - Dash */}
      <text
        x="108"
        y="64"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9.5"
        fill={subFill}
        letterSpacing="4"
        fontWeight="600"
      >
        — MARKETING —
      </text>
    </svg>
  )
}
