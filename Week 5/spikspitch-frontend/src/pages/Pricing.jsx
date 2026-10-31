import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { plan } from '../data/plan.js'

export default function Pricing() {
  return (
    <div className="px-5 py-10 sm:px-12 md:py-14">
      <h1 className="display-chunky text-chunky text-center text-6xl uppercase text-[var(--purple)] sm:text-8xl">Pricing</h1>
      <p className="mx-auto mt-4 max-w-md text-center text-lg font-semibold">One plan. Try it free first.</p>

      <div className="relative mx-auto mt-12 max-w-lg">
        <div
          className="card-chunky card-chunky--mint floaty absolute -right-3 -top-6 z-10 rotate-6 px-4 py-2 text-center"
          style={{ '--r': '6deg' }}
        >
          <span className="display-chunky text-3xl leading-none">{plan.trialDays}</span>
          <span className="block text-xs font-bold uppercase tracking-widest">day free trial</span>
        </div>

        <div className="card-chunky card-chunky--lg overflow-hidden">
          <div className="border-b-3 border-black bg-[var(--purple)] px-6 py-4">
            <h2 className="display-chunky text-chunky text-5xl uppercase text-[var(--yellow)]">{plan.name}</h2>
          </div>
          <div className="p-6 sm:p-8">
            <p className="flex items-end gap-2">
              <span className="display-chunky text-6xl leading-none sm:text-7xl">{plan.currency}{plan.price}</span>
              <span className="pb-2 text-lg font-bold">/ month</span>
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 font-semibold">
                  <span className="tile-chunky tile-chunky--round mt-0.5 h-6 w-6">
                    <Icon name="check" size={14} strokeWidth={4} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/checkout" className="btn-chunky btn-chunky--charcoal btn-chunky--block btn-chunky--xl mt-8">Start free trial</Link>
            <p className="mt-4 text-center text-sm font-semibold">
              Free for {plan.trialDays} days, then {plan.currency}{plan.price} per month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
