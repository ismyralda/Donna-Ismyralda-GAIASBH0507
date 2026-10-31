import { Link } from 'react-router-dom'

const cards = ['Dashboard Preview', 'Impression Blitz (60-second pitch)', 'Improv Showdown (roleplay with AI)']

export default function Landing() {
  return (
    <div>
      {/* Layer 1: hero + tagline */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 border-b p-8 text-center">
        <h1 className="text-4xl font-bold">SPEAK THE SPEECH. NAIL THE PITCH.</h1>
        <div className="border p-6">Tagline / short description goes here</div>
        <Link to="/signup" className="border p-2">Press Start</Link>
      </section>

      {/* Layer 2: carousel (later: cards move sideways as you scroll) */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-6 border-b p-8">
        <h2 className="text-2xl font-bold">CHOOSE YOUR MODE</h2>
        <div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c} className="flex h-64 items-center justify-center border p-4 text-center">
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* Layer 3: full-screen footer layer (later: revealed at the end) */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <h2 className="text-3xl font-bold">Ready to play?</h2>
        <Link to="/signup" className="border p-2">Press Start</Link>
      </section>
    </div>
  )
}
