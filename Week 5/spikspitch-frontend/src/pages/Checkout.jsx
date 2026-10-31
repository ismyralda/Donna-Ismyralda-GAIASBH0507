import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Field from '../components/Field.jsx'
import { plan } from '../data/plan.js'

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email.'
  if (!/^\d{13,19}$/.test(f.card.replace(/\s/g, ''))) e.card = 'Enter a valid card number.'
  const m = f.exp.match(/^(\d{2})\/(\d{2})$/)
  if (!m || +m[1] < 1 || +m[1] > 12) {
    e.exp = 'Use MM/YY.'
  } else {
    const now = new Date()
    const year = 2000 + +m[2]
    if (year < now.getFullYear() || (year === now.getFullYear() && +m[1] < now.getMonth() + 1)) {
      e.exp = 'That card has expired.'
    }
  }
  if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = 'Enter 3 or 4 digits.'
  return e
}

const formatCard = (v) => v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim()
const formatExp = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

export default function Checkout() {
  const navigate = useNavigate()
  const [f, setF] = useState({ name: '', email: '', card: '', exp: '', cvc: '' })
  const [errors, setErrors] = useState({})

  const set = (key, fmt = (v) => v) => (e) => {
    setF({ ...f, [key]: fmt(e.target.value) })
    if (errors[key]) setErrors({ ...errors, [key]: undefined })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(f)
    setErrors(found)
    if (Object.keys(found).length === 0) navigate('/success')
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:px-12 md:grid-cols-5 md:py-14">
      <div className="md:col-span-2">
        <div className="card-chunky card-chunky--purple p-6">
          <p className="chip-chunky chip-chunky--yellow">Order summary</p>
          <h1 className="display-chunky text-chunky mt-4 text-5xl uppercase text-[var(--yellow)]">{plan.name} plan</h1>
          <p className="display-chunky text-chunky mt-4 text-5xl leading-none text-[var(--yellow)]">
            {plan.currency}{plan.price}
            <span className="text-base font-bold"> / month</span>
          </p>
          <p className="chip-chunky chip-chunky--lg mt-5">
            {plan.trialDays}-day free trial
          </p>
          <p className="chip-chunky chip-chunky--yellow chip-chunky--lg mt-3">
            Due today: {plan.currency}0
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="card-chunky flex flex-col gap-4 p-6 md:col-span-3">
        <h2 className="display-chunky text-3xl">Payment</h2>
        <p className="callout-chunky">
          Demo only. Nothing is charged or saved. Don't enter real card details.
        </p>
        <Field id="name" label="Name on card" value={f.name} onChange={set('name')} error={errors.name} autoComplete="off" />
        <Field id="email" label="Email" type="email" value={f.email} onChange={set('email')} error={errors.email} autoComplete="off" />
        <Field id="card" label="Card number" inputMode="numeric" placeholder="4242 4242 4242 4242" value={f.card} onChange={set('card', formatCard)} error={errors.card} autoComplete="off" />
        <div className="grid grid-cols-2 gap-4">
          <Field id="exp" label="Expiry" inputMode="numeric" placeholder="MM/YY" value={f.exp} onChange={set('exp', formatExp)} error={errors.exp} autoComplete="off" />
          <Field id="cvc" label="CVC" inputMode="numeric" placeholder="123" maxLength={4} value={f.cvc} onChange={set('cvc', (v) => v.replace(/\D/g, ''))} error={errors.cvc} autoComplete="off" />
        </div>
        <button className="btn-chunky btn-chunky--charcoal btn-chunky--xl mt-2">Start free trial</button>
      </form>
    </div>
  )
}
