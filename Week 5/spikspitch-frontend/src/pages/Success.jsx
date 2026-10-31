import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { plan } from '../data/plan.js'

export default function Success() {
  return (
    <div className="px-5 py-12 sm:px-12 md:py-20">
      <div className="card-chunky card-chunky--lg relative mx-auto max-w-xl p-8 text-center sm:p-12">
        <Icon name="star" size={36} strokeWidth={3} fill="var(--mint)" className="floaty absolute -left-4 -top-5 text-black" />
        <Icon name="star" size={28} strokeWidth={3} fill="var(--purple)" className="floaty absolute -right-3 top-10 text-black" />
        <span className="chip-chunky"><Icon name="trophy" size={14} strokeWidth={3} /> Achievement unlocked</span>
        <h1 className="display-chunky text-chunky mt-5 text-6xl uppercase text-[var(--purple)] sm:text-7xl">You're in!</h1>
        <p className="mt-4 text-lg font-semibold">Your free trial has started ({plan.trialDays} days). +100 XP.</p>
        <Link to="/dashboard" className="btn-chunky btn-chunky--charcoal btn-chunky--xl mt-8">Go to dashboard</Link>
      </div>
    </div>
  )
}
