import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './StarRating.css'

interface Props {
  /** Current value (controlled) */
  value: number
  /** Called when user picks a star. Omit to make read-only. */
  onChange?: (value: number) => void
  /** Total stars (default 5) */
  max?: number
  size?: number
  /** Show numeric label beside stars */
  showLabel?: boolean
}

export default function StarRating({ value, onChange, max = 5, size = 20, showLabel = false }: Props) {
  const [hover, setHover] = useState(0)
  const readOnly = !onChange
  const display = hover || value

  return (
    <span className={`sr-wrap${readOnly ? ' sr-readonly' : ''}`} aria-label={`${value} de ${max} estrelas`}>
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1
        return (
          <button
            key={star}
            type="button"
            className={`sr-star${display >= star ? ' filled' : ''}`}
            style={{ fontSize: size }}
            onClick={readOnly ? undefined : () => onChange(star)}
            onMouseEnter={readOnly ? undefined : () => setHover(star)}
            onMouseLeave={readOnly ? undefined : () => setHover(0)}
            disabled={readOnly}
            aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
            tabIndex={readOnly ? -1 : 0}
          >
            <FaStar />
          </button>
        )
      })}
      {showLabel && <span className="sr-label">{value > 0 ? value.toFixed(1) : '—'}</span>}
    </span>
  )
}
