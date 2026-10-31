import { Link } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import { SegBar } from '../../components/ui.jsx'
import { gradeFor, player, sessions } from '../../data/sessions.js'

function Stat({ icon, label, value }) {
  return (
    <div className="card-chunky flex items-center gap-4 p-4">
      <span className="tile-chunky tile-chunky--charcoal h-14 w-14 text-[var(--mint)]">
        <Icon name={icon} size={28} strokeWidth={2.75} />
      </span>
      <div>
        <p className="text-sm font-bold uppercase tracking-wide">{label}</p>
        <p className="display-chunky text-3xl leading-none">{value}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const scores = sessions.map((s) => s.score)
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  const best = Math.max(...scores)
  const history = [...sessions].reverse()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Level and XP */}
        <section className="card-chunky p-5 lg:col-span-2" aria-label="Level">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="display-chunky text-4xl uppercase">Level {player.level}</h2>
            <span className="chip-chunky">{player.rank}</span>
          </div>
          <SegBar value={player.xp} max={player.xpNext} segments={20} className="mt-4" />
          <p className="mt-2 text-sm font-bold">{player.xp} / {player.xpNext} XP to the next level</p>
        </section>

        {/* Daily quest */}
        {/* <section className="card-chunky card-chunky--mint p-5" aria-label="Daily quest">
          <p className="chip-chunky chip-chunky--yellow">Daily quest</p>
          <p className="mt-3 text-lg font-bold">Do one 60-second pitch today.</p>
          <SegBar value={0} max={1} segments={5} className="mt-3" />
          <Link to="/dashboard/practice/blitz" className="btn-chunky btn-chunky--charcoal btn-chunky--lg mt-4">
            <Icon name="player-play" size={16} strokeWidth={3} filled /> Play now
          </Link>
        </section> */}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon="flame" label="Streak" value={`${player.streak} days`} />
        <Stat icon="trophy" label="Best score" value={best} />
        <Stat icon="target" label="Average" value={avg} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Score chart */}
        <section className="card-chunky p-5 lg:col-span-2" aria-label="Score history">
          <h2 className="display-chunky text-2xl">Charisma over time</h2>
          <div
            className="mt-4 flex h-48 items-end gap-3"
            role="img"
            aria-label={`Scores: ${scores.join(', ')}`}
          >
            {sessions.map((s) => (
              <div key={s.id} className="flex h-full flex-1 flex-col justify-end gap-1">
                <span className="text-center text-sm font-bold">{s.score}</span>
                <div className="rounded-t-[8px] border-3 border-black bg-[var(--purple)]" style={{ height: `${s.score * 0.78}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3 text-center text-xs font-bold">
            {sessions.map((s) => (
              <span key={s.id} className="flex-1">#{s.id}</span>
            ))}
          </div>
        </section>

        {/* Mode picker */}
        {/* <section className="card-chunky card-chunky--mint flex flex-col gap-3 p-5" aria-label="Pick a mode">
          <h2 className="display-chunky text-2xl">Pick a mode</h2>
          <Link to="/dashboard/practice/blitz" className="btn-chunky btn-chunky--yellow btn-chunky--lg btn-chunky--start">
            <Icon name="clock" size={22} strokeWidth={3} /> Impression Blitz
          </Link>
          <Link to="/dashboard/practice/improv" className="btn-chunky btn-chunky--yellow btn-chunky--lg btn-chunky--start">
            <Icon name="swords" size={22} strokeWidth={3} /> Improv Showdown
          </Link>
        </section> */}
      </div>

      {/* Match history */}
      <section className="card-chunky p-5" aria-label="Match history">
        <h2 className="display-chunky text-2xl">Match history</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {history.map((s) => (
            <li key={s.id}>
              <Link
                to={`/dashboard/results/${s.id}`}
                className="card-chunky card-chunky--mint card-chunky--lift flex items-center gap-4 p-3"
              >
                <span className="tile-chunky tile-chunky--charcoal display-chunky h-12 w-12 text-2xl">
                  {gradeFor(s.score)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold">{s.title}</span>
                  <span className="block truncate text-sm font-semibold">{s.mode}</span>
                </span>
                <span className="display-chunky text-2xl">{s.score}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
