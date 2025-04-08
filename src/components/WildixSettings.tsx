import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Title, Subtitle } from '@reapit/elements'

const WildixSettings: React.FC = () => {
  const navigate = useNavigate()
  const [subdomain, setSubdomain] = useState(localStorage.getItem('wildixSubdomain') ?? '')
  const [error, setError] = useState<string | null>(null)

  const handleConnect = () => {
    if (!subdomain) {
      setError('Please enter your PBX subdomain.')
      return
    }

    // Store the subdomain
    localStorage.setItem('wildixSubdomain', subdomain)

    // Redirect to Wildix OAuth2.0 authorize endpoint
    const clientId = 'oauth2-reapit-0096147001744041740' // <-- Replace this
    const redirectUri = encodeURIComponent('https://reapit.storah.info/wildix-callback')
    const authUrl = `https://${subdomain}.wildixin.com/authorization/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
    
    window.location.href = authUrl
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Title>Wildix Settings</Title>
      <Subtitle>Connect your PBX and authenticate via OAuth2.0</Subtitle>

      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
        PBX Subdomain
      </label>
      <Input
        placeholder="e.g. mycompany"
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
      />

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}

      <Button style={{ marginTop: '2rem' }} intent="primary" onClick={handleConnect}>
        Connect to Wildix
      </Button>
    </div>
  )
}

export default WildixSettings
