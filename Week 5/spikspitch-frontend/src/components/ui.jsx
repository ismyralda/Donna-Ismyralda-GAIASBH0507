// Segmented "game" bar used for XP and scores. Styles: .segbar-chunky in App.css.
// fill: a style-guide colour name, eg. 'purple' or 'mint'.
export function SegBar({ value, max = 100, segments = 10, fill = 'purple', className = '' }) {
  const filled = Math.round((value / max) * segments)
  return (
    <div
      className={`segbar-chunky ${className}`}
      style={{ '--seg-fill': `var(--${fill})` }}
      role="img"
      aria-label={`${value} out of ${max}`}
    >
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={`segbar-chunky__seg ${i < filled ? 'is-filled' : ''}`} />
      ))}
    </div>
  )
}
