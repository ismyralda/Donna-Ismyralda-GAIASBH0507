import { useEffect, useState } from 'react'

const KEY = 'spikspitch-name'
const DEFAULT = 'Player 1'

export function getUserName() {
  try {
    return localStorage.getItem(KEY) || DEFAULT
  } catch {
    return DEFAULT
  }
}

export function setUserName(name) {
  try {
    localStorage.setItem(KEY, name.trim() || DEFAULT)
  } catch {
    /* storage can be blocked; the app still works */
  }
  window.dispatchEvent(new Event('spik-user'))
}

export function clearUserName() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('spik-user'))
}

export function useUserName() {
  const [name, setName] = useState(getUserName)
  useEffect(() => {
    const sync = () => setName(getUserName())
    window.addEventListener('spik-user', sync)
    return () => window.removeEventListener('spik-user', sync)
  }, [])
  return name
}
