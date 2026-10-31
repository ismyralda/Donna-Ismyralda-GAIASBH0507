import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-3 border-black bg-[var(--yellow)] px-6 py-4 text-sm font-bold sm:px-10">
      <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
        {/* <Link to="/blog" className="underline decoration-2 underline-offset-4 hover:bg-[var(--charcoal)] hover:text-[var(--yellow)]">Blog</Link> */}
        <Link to="/pricing" className="underline decoration-2 underline-offset-4 hover:bg-[var(--charcoal)] hover:text-[var(--yellow)]">Pricing</Link>
        <Link to="/login" className="underline decoration-2 underline-offset-4 hover:bg-[var(--charcoal)] hover:text-[var(--yellow)]">Login</Link>
      </nav>
      <p>© SpikSpitch</p>
    </footer>
  )
}
