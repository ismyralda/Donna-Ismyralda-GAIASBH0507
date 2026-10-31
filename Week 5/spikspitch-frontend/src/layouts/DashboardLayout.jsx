import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import logofont from '../assets/logofont.png'
import { gradeFor, sessions } from '../data/sessions.js'
import { clearUserName, useUserName } from '../lib/user.js'

// [path, label, icon, end?]
const nav = [
  ['/dashboard', 'Dashboard', 'layout-dashboard', true],
  ['/dashboard/practice/blitz', 'Impression Blitz', 'clock', false],
  ['/dashboard/practice/improv', 'Improv Showdown', 'messages', false],
]

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false) // desktop rail
  const [drawer, setDrawer] = useState(false) // phone drawer
  const [menu, setMenu] = useState(false) // profile dropdown
  const name = useUserName()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Close the phone drawer and profile menu whenever the page changes
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setDrawer(false)
    setMenu(false)
  }

  // The two game screens (Impression Blitz, Improv Showdown) get the full width, no top bar
  const hideTopBar = pathname.startsWith('/dashboard/practice/')
  const hideWhenCollapsed = collapsed ? 'md:hidden' : ''
  const recent = [...sessions].reverse()

  function logOut() {
    clearUserName()
    navigate('/')
  }

  return (
    <div className="flex min-h-dvh gap-4 p-3 md:p-4">
      {drawer && <div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={() => setDrawer(false)} aria-hidden="true" />}

      {/* Collapsible sidebar */}
      <aside
        aria-label="Sidebar"
        className={[
          'card-chunky card-chunky--cream z-30 flex flex-col gap-3 p-3 transition-[width,transform] duration-200',
          'fixed inset-y-3 left-3 w-72 md:sticky md:top-4 md:h-[calc(100dvh-2rem)] md:self-start md:translate-x-0',
          drawer ? 'translate-x-0' : '-translate-x-[120%]',
          collapsed ? 'md:w-[5.5rem]' : 'md:w-72',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center rounded-[12px] p-1" aria-label="SpikSpitch home">
            <img src={logofont} alt="" className={`h-10 max-w-none ${collapsed ? 'md:h-8' : ''}`} />
          </Link>
          <button className="btn-chunky btn-chunky--ghost md:hidden!" onClick={() => setDrawer(false)} aria-label="Close menu">
            <Icon name="x" size={20} strokeWidth={3} />
          </button>
        </div>

        <button
          className={`btn-chunky btn-chunky--ghost hidden! md:inline-flex! ${collapsed ? '' : 'self-end'}`}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
        >
          {collapsed ? <Icon name="chevrons-right" size={20} strokeWidth={3} /> : <><Icon name="chevrons-left" size={20} strokeWidth={3} /> Collapse</>}
        </button>

        <nav aria-label="Dashboard" className="flex flex-col gap-1">
          {nav.map(([to, label, icon, end]) => (
            <NavLink key={to} to={to} end={end} className="nav-item-chunky" title={label}>
              <Icon name={icon} size={22} strokeWidth={2.75} />
              <span className={hideWhenCollapsed}>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-1 flex min-h-0 flex-1 flex-col border-t-3 border-black pt-3">
          <h2 className={`mb-2 flex items-center gap-2 px-1 text-sm font-bold uppercase tracking-wide ${hideWhenCollapsed}`}>
            <Icon name="history" size={16} strokeWidth={3} /> Past projects
          </h2>
          <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
            {recent.map((s) => (
              <li key={s.id}>
                <NavLink to={`/dashboard/results/${s.id}`} className="nav-item-chunky" title={`${s.title} · ${s.score}`}>
                  <span className="tile-chunky display-chunky h-8 w-8 text-lg">{gradeFor(s.score)}</span>
                  <span className={`truncate ${hideWhenCollapsed}`}>{s.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Settings, bottom left */}
        <NavLink to="/dashboard/settings" className="nav-item-chunky" title="Settings">
          <Icon name="settings" size={22} strokeWidth={2.75} />
          <span className={hideWhenCollapsed}>Settings</span>
        </NavLink>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {/* Top bar: greeting left, profile right */}
        {!hideTopBar && (
          <header className="card-chunky card-chunky--cream flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <button className="btn-chunky btn-chunky--ghost md:hidden!" onClick={() => setDrawer(true)} aria-label="Open menu">
                <Icon name="menu-2" size={22} strokeWidth={3} />
              </button>
              <h1 className="display-chunky truncate">Hi, {name}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  className="btn-chunky btn-chunky--yellow"
                  onClick={() => setMenu(!menu)}
                  aria-haspopup="menu"
                  aria-expanded={menu}
                >
                  <span className="tile-chunky tile-chunky--purple tile-chunky--round display-chunky h-7 w-7">
                    {name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline">Profile</span>
                </button>
                {menu && (
                  <div role="menu" className="card-chunky absolute right-0 top-full z-30 mt-3 flex w-48 flex-col gap-1 p-2">
                    <Link role="menuitem" to="/dashboard/settings" className="nav-item-chunky">
                      <Icon name="settings" size={18} strokeWidth={3} /> Settings
                    </Link>
                    <button role="menuitem" onClick={logOut} className="nav-item-chunky text-left">
                      <Icon name="logout" size={18} strokeWidth={3} /> Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
        )}

        {/* Phones only: without the top bar, a small floating button opens the sidebar drawer */}
        {hideTopBar && (
          <button
            className="btn-chunky btn-chunky--yellow fixed left-3 top-3 z-20 md:hidden!"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
          >
            <Icon name="menu-2" size={22} strokeWidth={3} />
          </button>
        )}

        <main className={`flex-1 ${hideTopBar ? 'pt-14 md:pt-0' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
