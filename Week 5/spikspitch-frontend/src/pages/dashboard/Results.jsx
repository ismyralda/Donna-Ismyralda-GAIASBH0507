import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import { SegBar } from '../../components/ui.jsx'
import { gradeFor, sessions } from '../../data/sessions.js'

const contentLabels = { main: 'Clear main point', hook: 'Opening hook', structure: 'Structure' }
const deliveryLabels = { pace: 'Pace', fillers: 'Fillers', eye: 'Eye contact', pauses: 'Long pauses', posture: 'Posture' }

const tips = {
  main: 'State your one big idea in the first 15 seconds.',
  hook: 'Open with a question, a number, or a bold claim.',
  structure: 'Use open, prove, close so listeners never get lost.',
  pace: 'Keep a steady pace and breathe between ideas.',
  fillers: 'Swap "um" and "uh" for a short pause.',
  eye: 'Look at the camera lens, not at your own face.',
  pauses: 'Keep pauses short and purposeful.',
  posture: 'Sit or stand tall with relaxed shoulders.',
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useCountUp(target) {
  const [v, setV] = useState(() => (prefersReducedMotion() ? target : 0))
  useEffect(() => {
    if (prefersReducedMotion()) return
    let raf
    let start
    const step = (t) => {
      if (start === undefined) start = t
      const p = Math.min(1, (t - start) / 900)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return v
}

function Rows({ labels, data }) {
  return (
    <ul className="mt-4 space-y-4">
      {Object.entries(labels).map(([key, label]) => (
        <li key={key}>
          <div className="mb-1 flex justify-between font-bold">
            <span>{label}</span>
            <span className="display-chunky text-xl leading-none">{data[key]}</span>
          </div>
          <SegBar value={data[key]} />
        </li>
      ))}
    </ul>
  )
}

export default function Results() {
  const { id } = useParams()
  const s = sessions.find((x) => x.id === Number(id)) || sessions[sessions.length - 1]
  // key: opening another result resets the count-up and closes the panels
  return <ResultView key={s.id} s={s} />
}

function ResultView({ s }) {
  const shown = useCountUp(s.score)
  const [panel, setPanel] = useState(null) // 'transcript' | 'coaching' | null

  const all = { ...s.content, ...s.delivery }
  const weakest = Object.entries(all).sort((a, b) => a[1] - b[1]).slice(0, 3)
  const toggle = (name) => setPanel(panel === name ? null : name)

  return (
    <div className="flex flex-col gap-4">
      <section className="card-chunky card-chunky--lg relative p-6 sm:p-8" aria-label="Round complete">
        <p className="chip-chunky">Round complete · {s.mode}</p>
        <h2 className="display-chunky mt-3 text-3xl sm:text-4xl">{s.title}</h2>
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide">Charisma score</p>
            <p className="display-chunky text-8xl leading-none" aria-label={`${s.score} out of 100`}>{shown}</p>
          </div>
          <div className="card-chunky card-chunky--purple floaty grid h-28 w-28 rotate-6 place-items-center" style={{ '--r': '6deg' }} aria-label={`Grade ${gradeFor(s.score)}`}>
            <span className="display-chunky text-chunky text-7xl leading-none text-[var(--yellow)]">{gradeFor(s.score)}</span>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="card-chunky card-chunky--mint p-5" aria-label="Content">
          <h2 className="display-chunky text-2xl">Content</h2>
          <Rows labels={contentLabels} data={s.content} />
        </section>
        <section className="card-chunky p-5" aria-label="Delivery">
          <h2 className="display-chunky text-2xl">Delivery</h2>
          <Rows labels={deliveryLabels} data={s.delivery} />
        </section>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link to="/dashboard/practice/blitz" className="btn-chunky btn-chunky--mint btn-chunky--lg"><Icon name="rotate" size={18} strokeWidth={3} /> Another attempt</Link>
        <button className="btn-chunky btn-chunky--yellow btn-chunky--lg"><Icon name="player-play" size={18} strokeWidth={3} filled /> Replay</button>
        <button className="btn-chunky btn-chunky--yellow btn-chunky--lg" onClick={() => toggle('transcript')} aria-expanded={panel === 'transcript'}>
          <Icon name="file-text" size={18} strokeWidth={3} /> Read my transcript
        </button>
        <button className="btn-chunky btn-chunky--charcoal btn-chunky--lg" onClick={() => toggle('coaching')} aria-expanded={panel === 'coaching'}>
          <Icon name="bulb" size={18} strokeWidth={3} /> Coaching advice
        </button>
      </div>

      {panel === 'transcript' && (
        <section className="card-chunky card-chunky--mint p-5" aria-label="Transcript">
          <h2 className="display-chunky text-2xl">Transcript</h2>
          <p className="mt-3 max-w-3xl text-lg font-medium leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </section>
      )}

      {panel === 'coaching' && (
        <section className="card-chunky card-chunky--mint p-5" aria-label="Coaching advice">
          <h2 className="display-chunky text-2xl">Coaching advice</h2>
          <p className="mt-2 font-semibold">Your three weakest spots this round:</p>
          <ol className="mt-4 space-y-3">
            {weakest.map(([key, value], i) => (
              <li key={key} className="card-chunky flex items-start gap-3 p-3">
                <span className="tile-chunky tile-chunky--charcoal display-chunky h-8 w-8 text-lg">{i + 1}</span>
                <span className="font-semibold">
                  <span className="font-bold">{contentLabels[key] || deliveryLabels[key]} ({value}).</span> {tips[key]}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}
