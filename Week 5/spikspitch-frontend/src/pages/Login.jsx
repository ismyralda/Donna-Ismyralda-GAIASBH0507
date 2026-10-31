import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard.jsx'
import Field from '../components/Field.jsx'
import { setUserName } from '../lib/user.js'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // Mock login: use the part of the email before the @ as the player name.
    const base = email.split('@')[0] || 'Player 1'
    setUserName(base.charAt(0).toUpperCase() + base.slice(1))
    navigate('/dashboard')
  }

  return (
    <AuthCard
      title="Login"
      chip="Player select"
      footer={<>No account? <Link to="/signup" className="underline decoration-2 underline-offset-4">Sign up</Link></>}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field id="email" label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field id="password" label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-chunky btn-chunky--charcoal btn-chunky--lg mt-2">Login</button>
      </form>
    </AuthCard>
  )
}
