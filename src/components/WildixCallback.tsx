import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const WildixCallback: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const token = params.get('access_token')

    if (token) {
      localStorage.setItem('wildixAccessToken', token)
      navigate('/dashboard')
    } else {
      navigate('/wildix-settings')
    }
  }, [navigate])

  return <p>Authorizing with Wildix...</p>
}

export default WildixCallback
