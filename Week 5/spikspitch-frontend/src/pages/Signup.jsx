import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard.jsx'
import Field from '../components/Field.jsx'
import { setUserName } from '../lib/user.js'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setUserName(name)
    navigate('/pricing')
  }

  return (
    <AuthCard
      title="Sign up"
      chip="New game"
      footer={<>Already have an account? <Link to="/login" className="underline decoration-2 underline-offset-4">Login</Link></>}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field id="name" label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <Field id="email" label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field id="password" label="Password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-chunky btn-chunky--charcoal btn-chunky--lg mt-2">Create account</button>
      </form>
    </AuthCard>
  )
}
