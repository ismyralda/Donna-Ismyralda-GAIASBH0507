import { icons } from '../data/icons.js'

// Inline SVG icon (Tabler set in data/icons.js). Replaces lucide-react.
// size: pixels. filled: solid shape in the text colour (eg. play/stop).
// fill: a specific fill colour while the outline stays currentColor (eg. fill="var(--mint)").
export default function Icon({ name, size = 24, strokeWidth = 2.5, filled = false, fill, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : fill || 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icons[name] || '' }}
    />
  )
}
