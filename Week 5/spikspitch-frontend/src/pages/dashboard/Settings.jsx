import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import Field from '../../components/Field.jsx'
import { clearUserName, setUserName, useUserName } from '../../lib/user.js'

export default function Settings() {
  const stored = useUserName()
  const navigate = useNavigate()
  const [name, setName] = useState(stored)
  const [limit, setLimit] = useState('60')
  const [sound, setSound] = useState(true)
  const [saved, setSaved] = useState(false)

  function save(e) {
    e.preventDefault()
    setUserName(name)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form onSubmit={save} className="card-chunky max-w-xl p-6 sm:p-8">
      <h2 className="display-chunky text-3xl">Settings</h2>
      <div className="mt-6 flex flex-col gap-5">
        <Field id="display" label="Display name" value={name} onChange={(e) => setName(e.target.value)} />

        <div>
          <label htmlFor="limit" className="label-chunky">Practice time limit</label>
          <select id="limit" className="input-chunky" value={limit} onChange={(e) => setLimit(e.target.value)}>
            <option value="60">60 seconds</option>
            <option value="120">120 seconds</option>
            <option value="180">180 seconds</option>
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-3 font-bold">
          <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} className="checkbox-chunky" />
          Sound effects
        </label>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button className="btn-chunky btn-chunky--charcoal btn-chunky--lg">{saved ? 'Saved ✓' : 'Save'}</button>
        <button
          type="button"
          className="btn-chunky btn-chunky--ghost btn-chunky--lg"
          onClick={() => { clearUserName(); navigate('/') }}
        >
          <Icon name="logout" size={18} strokeWidth={3} /> Log out
        </button>
      </div>
    </form>
  )
}
