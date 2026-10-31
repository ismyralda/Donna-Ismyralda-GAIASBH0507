import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import { SegBar } from '../../components/ui.jsx'
import { sessions } from '../../data/sessions.js'

const modes = {
  blitz: {
    title: 'Impression Blitz (60 seconds)',
    limit: 60,
    icon: 'clock',
    prompt: 'Introduce yourself in 60 seconds. Give a clear main point, a strong opening hook, and a tidy structure.',
  },
  improv: {
    title: 'Improv Showdown',
    limit: 120,
    icon: 'swords',
    prompt: 'You are pitching your idea to a skeptical investor. Answer every question without losing your main point.',
  },
}

const aiLines = [
  'Alright, you have two minutes. Why should I invest in your idea?',
  'Interesting. Who else is solving this problem today?',
  'What happens if your biggest customer walks away?',
  'Last question: what do you need from me, exactly?',
]

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

// function Chat() {
//   const [log, setLog] = useState([{ from: 'ai', text: aiLines[0] }])
//   const [text, setText] = useState('')
//   const turn = useRef(1)
//   const end = useRef(null)

//   useEffect(() => {
//     end.current?.scrollIntoView({ block: 'nearest' })
//   }, [log])

//   function send(e) {
//     e.preventDefault()
//     if (!text.trim()) return
//     const reply = aiLines[turn.current % aiLines.length]
//     turn.current += 1
//     setLog([...log, { from: 'you', text: text.trim() }, { from: 'ai', text: reply }])
//     setText('')
//   }

//   return (
//     <section className="card-chunky card-chunky--mint p-4" aria-label="Chat with your AI opponent">
//       <div className="flex max-h-64 flex-col gap-3 overflow-y-auto pr-1">
//         {log.map((m, i) => (
//           <p key={i} className={`bubble-chunky ${m.from === 'you' ? 'bubble-chunky--you' : ''}`}>
//             {m.text}
//           </p>
//         ))}
//         <div ref={end} />
//       </div>
//       <form onSubmit={send} className="mt-4 flex gap-3">
//         <label htmlFor="reply" className="sr-only">Your reply</label>
//         <input
//           id="reply"
//           className="input-chunky input-chunky--yellow"
//           placeholder="Type your reply"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           autoComplete="off"
//         />
//         <button className="btn-chunky btn-chunky--charcoal btn-chunky--lg" aria-label="Send reply"><Icon name="send" size={20} strokeWidth={3} /></button>
//       </form>
//     </section>
//   )
// }

export default function Practice() {
  const { mode } = useParams()
  // key: switching mode starts a fresh round (resets the timer and status)
  return <Round key={mode} mode={mode} />
}

function Round({ mode }) {
  const cfg = modes[mode] || modes.blitz
  const [picked, setStatus] = useState('idle') // idle | recording | done
  const [secs, setSecs] = useState(0)
  const [replay, setReplay] = useState(false)
  const latest = sessions[sessions.length - 1].id

  // Recording ends by itself when the time limit is reached
  const status = picked === 'recording' && secs >= cfg.limit ? 'done' : picked

  useEffect(() => {
    if (status !== 'recording') return
    const t = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [status])

  function rewatch() {
    setReplay(true)
    setTimeout(() => setReplay(false), 2500)
  }

  return (
    <div className="flex flex-col gap-4">
      <section className="card-chunky p-5" aria-label="Prompt">
        <p className="chip-chunky"><Icon name={cfg.icon} size={14} strokeWidth={3} /> {cfg.title}</p>
        <h2 className="display-chunky mt-3 text-2xl sm:text-3xl">Your prompt</h2>
        <p className="mt-2 max-w-3xl text-lg font-semibold">{cfg.prompt}</p>
      </section>

      {/* Video area */}
      <section className="card-chunky card-chunky--charcoal relative flex aspect-video max-h-[60dvh] w-full flex-col items-center justify-center gap-3" style={{ '--card-fg': 'var(--mint)' }} aria-label="Video">
        {status === 'idle' && (
          <>
            <Icon name="camera" size={64} strokeWidth={2.25} />
            <p className="display-chunky text-2xl">Camera preview</p>
            <span className="chip-chunky chip-chunky--yellow">Ready</span>
          </>
        )}
        {status === 'recording' && (
          <>
            <span className="chip-chunky chip-chunky--yellow absolute left-4 top-4">
              <span className="blink inline-block h-3 w-3 rounded-full bg-black" aria-hidden="true" /> Rec {fmt(secs)} / {fmt(cfg.limit)}
            </span>
            <Icon name="microphone" size={72} strokeWidth={2.25} className="blink" />
            <p className="display-chunky text-2xl">Recording…</p>
          </>
        )}
        {status === 'done' && (
          <>
            <Icon name="player-play" size={72} strokeWidth={2.25} filled />
            <p className="display-chunky text-2xl">{replay ? 'Replaying…' : 'Replay ready'}</p>
            <span className="chip-chunky chip-chunky--yellow">{fmt(Math.min(secs, cfg.limit))} recorded</span>
          </>
        )}
      </section>

      <div className="card-chunky p-2">
        <SegBar value={Math.min(secs, cfg.limit)} max={cfg.limit} segments={20} fill="mint" />
      </div>

      {/* {mode === 'improv' && <Chat />} */}

      {/* Buttons change with the status */}
      <div className="flex flex-wrap gap-4">
        {status === 'idle' && (
          <button className="btn-chunky btn-chunky--mint btn-chunky--xl" onClick={() => { setSecs(0); setStatus('recording') }}>
            <Icon name="player-play" size={20} strokeWidth={3} filled /> Start
          </button>
        )}
        {status === 'recording' && (
          <button className="btn-chunky btn-chunky--charcoal btn-chunky--xl" onClick={() => setStatus('done')}>
            <Icon name="player-stop" size={18} strokeWidth={3} filled /> Stop
          </button>
        )}
        {status === 'done' && (
          <>
            <button className="btn-chunky btn-chunky--yellow btn-chunky--lg" onClick={rewatch}>
              <Icon name="player-play" size={18} strokeWidth={3} filled /> Rewatch
            </button>
            <button className="btn-chunky btn-chunky--mint btn-chunky--lg" onClick={() => { setSecs(0); setStatus('idle') }}>
              <Icon name="rotate" size={18} strokeWidth={3} /> Another attempt
            </button>
            <Link to={`/dashboard/results/${latest}`} className="btn-chunky btn-chunky--charcoal btn-chunky--lg">See score</Link>
          </>
        )}
      </div>
    </div>
  )
}
