import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import Navbar from '../components/Navbar.jsx'

// Order, titles and descriptions follow main's Landing. Layout and art follow the teammate's design.
const modes = [
  {
    to: '/login', tag: 'Mode 01', title: 'Impression Blitz', sub: '60-second pitch', icon: 'clock', art: 'blitz',
    text: 'A 60-second planned self-introduction. Hit record, deliver your intro, and get a full scorecard on delivery and content right after.', cta: 'Play',
  },
  {
    to: '/login', tag: 'Mode 02', title: 'Improv Showdown', sub: 'Roleplay with AI', icon: 'messages', art: 'improv',
    text: 'A scenario and a listener are dealt at random. You get 30 seconds to prepare, then 60 seconds to think on your feet.', cta: 'Play'
  },
  {
    to: '/login', tag: 'Dashboard', title: 'Dashboard Preview', sub: 'Track your progress', icon: 'layout-dashboard', art: 'dash',
    text: "Compare your last two attempts side by side and see exactly what's improving, plus how you're doing with each listener type.", cta: 'View'
  },
]

const ticker = ['Press Start', 'Charisma +10', 'Level up', 'No more ums', 'Round 1', 'Nail the pitch']

const artBox = 'rounded-[var(--radius-md)] border-3 border-black'

function Art({ kind }) {
  if (kind === 'dash') {
    return (
      <div className={`flex h-28 w-full items-end gap-2 ${artBox} bg-[var(--yellow)] p-3`}>
        {[40, 65, 50, 85, 70].map((h, i) => (
          <div key={i} className="flex-1 border-2 border-black bg-[var(--purple)]" style={{ height: `${h}%` }} />
        ))}
      </div>
    )
  }
  if (kind === 'blitz') {
    return (
      <div className={`flex h-28 w-full items-center justify-center ${artBox} bg-[var(--charcoal)] text-[var(--yellow)]`}>
        <span className="display-chunky text-6xl leading-none">60</span>
        <span className="display-chunky ml-2 text-xl text-[var(--mint)]">SEC</span>
      </div>
    )
  }
  return (
    <div className="flex h-28 w-full flex-col justify-center gap-2">
      <div className={`w-4/5 ${artBox} bg-[var(--yellow)] px-3 py-1 text-sm font-bold`}>Why should I invest?</div>
      <div className={`ml-auto w-4/5 ${artBox} bg-[var(--charcoal)] px-3 py-1 text-right text-sm font-bold text-[var(--yellow)]`}>Because…</div>
    </div>
  )
}

function ModeCard({ m }) {
  return (
    <Link
      to={m.to}
      className="card-chunky card-chunky--cream card-chunky--lg card-chunky--lift group flex h-[min(60dvh,28rem)] w-[min(78vw,21rem)] shrink-0 flex-col justify-between p-5"
    >
      <div className="flex items-center justify-between">
        <span className="chip-chunky chip-chunky--purple">{m.tag}</span>
        <Icon name={m.icon} size={28} strokeWidth={2.75} />
      </div>
      <div className="my-2 flex flex-1 items-center">
        <Art kind={m.art} />
      </div>
      <div>
        <h3 className="display-chunky text-2xl">{m.title}</h3>
        <p className="text-sm font-bold uppercase tracking-wide">{m.sub}</p>
        <p className="mt-1 text-sm font-medium">{m.text}</p>
        <span className="mt-3 inline-flex items-center gap-2 font-bold">
          {m.cta} <Icon name="arrow-right" size={18} strokeWidth={3} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

/* ---------- Layer 1: hero (pinned while the next layer slides over it) ---------- */
function Hero() {
  return (
    <section className="hero-dots sticky top-0 z-0 flex h-dvh flex-col overflow-hidden">
      <Navbar floating />
      <div
        className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col items-center justify-center px-5 pb-6 pt-24 sm:px-10"
        style={{ gap: 'clamp(1rem, 4dvh, 2.5rem)' }}
      >
        <h1
          className="display-chunky text-chunky text-chunky--lg text-center uppercase text-[var(--yellow)]"
          style={{ fontSize: 'clamp(2rem, min(6.4vw, 12dvh), 6.5rem)' }}
        >
          Speak the speech.
          <br />
          Nail the pitch.
        </h1>

        <div className="card-chunky card-chunky--lilac card-chunky--lg relative w-full max-w-4xl p-6 sm:p-9">
          <div
            className="card-chunky card-chunky--mint floaty absolute -top-7 right-4 grid rotate-6 place-items-center px-4 py-1 text-center sm:-right-5"
            style={{ '--r': '6deg', borderRadius: '999px' }}
          >
            <span className="text-[.65rem] font-bold uppercase tracking-widest">Charisma</span>
            <span className="display-chunky text-3xl leading-none">87</span>
          </div>
          <p className="display-chunky max-sm:pr-16" style={{ fontSize: 'clamp(1.4rem, min(3.6vw, 5.5dvh), 2.6rem)' }}>
            Practice the pitch before it counts.
          </p>
          <p className="hero-desc mt-3 max-w-2xl text-base font-medium sm:text-lg">
            Record yourself, get scored on content and delivery, and level up one round at a time.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link to="/signup" className="btn-chunky btn-chunky--purple btn-chunky--xl">
              <Icon name="player-play" size={20} strokeWidth={3} filled /> Press Start
            </Link>
            {/* <Link to="/blog" className="btn-chunky btn-chunky--ghost btn-chunky--lg">Read the blog</Link> */}
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t-3 border-black bg-[var(--charcoal)] py-2 text-[var(--yellow)]" aria-hidden="true">
        <div className="marquee-track display-chunky flex w-max text-lg">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 gap-8 pr-8">
              {[...ticker, ...ticker].map((w, i) => (
                <span key={i} className="whitespace-nowrap">{w} <span className="text-[var(--yellow)]">★</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Layer 2: cards slide right to left as you scroll down ---------- */
function Carousel() {
  const section = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const s = section.current
    const t = track.current
    if (!s || !t) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const total = s.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -s.getBoundingClientRect().top / total))
      const box = t.parentElement.getBoundingClientRect()
      const W = box.width
      const mid = t.children[1]
      const start = W
      const end = W / 2 - (mid.offsetLeft + mid.offsetWidth / 2) // card 2 centered
      t.style.transform = `translate3d(${start + (end - start) * p}px,0,0)`

      const fadeLen = t.children[0].offsetWidth * 0.8
      const settle = Math.min(1, Math.max(0, (p - 0.9) / 0.1))
      Array.from(t.children).forEach((card) => {
        const left = card.getBoundingClientRect().left
        const fade = Math.min(1, Math.max(0, (box.right - left) / fadeLen))
        card.style.opacity = Math.max(fade, settle)
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={section}
      className="carousel-outer relative z-10 rounded-t-[50%_5rem] bg-[var(--purple)]"
      style={{ height: '320dvh' }}
      aria-label="Game modes"
    >
      <div className="carousel-inner sticky top-0 flex h-dvh flex-col overflow-hidden pt-28">
        <div className="px-5 text-center">
          <h2 className="display-chunky text-chunky text-4xl uppercase text-[var(--yellow)] sm:text-6xl">Choose your mode</h2>
          <p className="chip-chunky mt-3">Scroll to explore ↓</p>
        </div>

        <div className="carousel-stage relative mt-5 flex-1">
          <div className="carousel-panel card-chunky card-chunky--lg absolute inset-x-[9%] inset-y-[3%]" />
          <div className="absolute inset-x-[9%] inset-y-[3%] overflow-x-clip">
            <div ref={track} className="carousel-track absolute inset-y-0 left-0 flex w-max items-center gap-6 will-change-transform">
              {modes.map((m) => (
                <ModeCard key={m.title} m={m} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Layer 3: full-screen footer, revealed when the page runs out ---------- */
const footerLinks = /*[['/blog', 'Blog'],*/ [['/pricing', 'Pricing'], ['/login', 'Login']]

function FooterLayer() {
  return (
    <section className="fixed inset-x-0 bottom-0 z-0 flex h-dvh flex-col bg-[var(--bg)]" aria-label="Footer">
      <div className="flex flex-1 flex-col items-center justify-center px-5 pt-16 text-center" style={{ gap: 'clamp(.75rem, 3dvh, 1.75rem)' }}>
        <span className="chip-chunky">Final round</span>
        <h2
          className="display-chunky text-chunky text-chunky--lg uppercase text-[var(--yellow)]"
          style={{ fontSize: 'clamp(2.4rem, min(8.6vw, 16dvh), 7.5rem)' }}
        >
          Ready to play?
        </h2>
        <Link to="/signup" className="btn-chunky btn-chunky--purple btn-chunky--xl">
          <Icon name="player-play" size={22} strokeWidth={3} filled /> Press Start
        </Link>
        <p className="blink display-chunky text-2xl" aria-hidden="true">[ Insert coin ]</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-3 border-black bg-[var(--charcoal)] px-6 py-4 text-sm font-bold text-[var(--yellow)] sm:px-10">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
          {footerLinks.map(([to, label]) => (
            <Link key={to} to={to} className="underline decoration-2 underline-offset-4 hover:bg-[var(--yellow)] hover:text-[var(--charcoal)]">
              {label}
            </Link>
          ))}
        </nav>
        <p>© SpikSpitch</p>
      </div>
    </section>
  )
}

export default function Landing() {
  return (
    <>
      {/* <ScrollProgress /> */}
      {/* Layers 1 and 2. The bottom margin leaves one screen of room for the footer layer behind. */}
      <div className="relative z-10 border-b-3 border-black bg-[var(--purple)]" style={{ marginBottom: '100dvh' }}>
        <Hero />
        <Carousel />
      </div>
      <FooterLayer />
    </>
  )
}
