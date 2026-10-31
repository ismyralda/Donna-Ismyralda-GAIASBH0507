import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
      <p className="chip-chunky chip-chunky--yellow">Game over</p>
      <h1 className="display-chunky text-chunky mt-4 text-8xl uppercase text-[var(--purple)] sm:text-9xl">404</h1>
      <p className="mt-4 text-lg font-semibold">Page not found.</p>
      <Link to="/" className="btn-chunky btn-chunky--charcoal btn-chunky--xl mt-8">Back to home</Link>
    </div>
  )
}
