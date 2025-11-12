// © 2025 Fahad Nadim Ziad — https://github.com/fnziad

interface ZeroTexLogoProps {
  className?: string
  size?: number
}

export default function ZeroTexLogo({ className = "", size = 40 }: ZeroTexLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      
      {/* Background hexagon */}
      <path
        d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
        fill="url(#logoGradient)"
        opacity="0.1"
      />
      
      {/* Stylized "0" representing Zero */}
      <circle
        cx="50"
        cy="50"
        r="22"
        stroke="url(#logoGradient)"
        strokeWidth="5"
        fill="none"
      />
      
      {/* LaTeX symbol - stylized line through */}
      <path
        d="M35 50 L65 50"
        stroke="url(#logoGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Small accent dots */}
      <circle cx="32" cy="35" r="2" fill="url(#logoGradient)" opacity="0.6" />
      <circle cx="68" cy="35" r="2" fill="url(#logoGradient)" opacity="0.6" />
      <circle cx="32" cy="65" r="2" fill="url(#logoGradient)" opacity="0.6" />
      <circle cx="68" cy="65" r="2" fill="url(#logoGradient)" opacity="0.6" />
    </svg>
  )
}

// Icon-only version for small spaces
export function ZeroTexIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="22" stroke="url(#iconGradient)" strokeWidth="5" fill="none" />
      <path d="M35 50 L65 50" stroke="url(#iconGradient)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
