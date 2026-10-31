import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logofont from '../assets/logofont.png'
import Icon from './Icon.jsx'

// [path, label, button colour variant]
const left = /*[['/blog', 'Blog', 'yellow'],*/ [['/pricing', 'Pricing', 'yellow']]
const right = [['/login', 'Login', 'yellow'], ['/signup', 'Sign up', 'mint']]

const btn = (variant) => `btn-chunky btn-chunky--${variant}`

// floating: sits on top of a full-screen landing layer instead of taking its own row
export default function Navbar({ floating = false }) {
  const [open, setOpen] = useState(false)
  // Same look everywhere (no bar, wide side padding). floating overlays a landing layer;
  // otherwise it takes its own row at the top of the page and scrolls away with it.
  const position = floating
    ? 'absolute inset-x-0 top-7 z-40 px-5 sm:px-10 lg:px-[8%]'
    : 'relative z-40 px-5 pb-2 pt-7 sm:px-10 lg:px-[8%]'

  return (
    <header className={position}>
      <div className="flex items-center justify-between gap-3">
        <nav aria-label="Main" className="flex items-center gap-3 sm:gap-4">
          {/* The logo is orange/blue/green, so it always sits in a cream chip */}
          <Link to="/" className="card-chunky card-chunky--cream px-3 py-1">
            <img src={logofont} alt="SpikSpitch Logo" className="h-10 w-auto" />
          </Link>
          <div className="hidden items-center gap-3 md:flex">
            {left.map(([to, label, v]) => (
              <NavLink key={to} to={to} className={btn(v)}>{label}</NavLink>
            ))}
          </div>
        </nav>

        <nav aria-label="Account" className="hidden items-center gap-3 md:flex">
          {right.map(([to, label, v]) => (
            <NavLink key={to} to={to} className={btn(v)}>{label}</NavLink>
          ))}
        </nav>

        <button
          className="btn-chunky btn-chunky--yellow md:hidden!"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'x' : 'menu-2'} size={22} strokeWidth={3} />
        </button>
      </div>

      {open && (
        <div className="card-chunky absolute right-5 top-full z-50 mt-3 flex w-56 flex-col gap-2 p-3 sm:right-10 md:hidden">
          {[...left, ...right].map(([to, label, v]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={btn(v)}>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
