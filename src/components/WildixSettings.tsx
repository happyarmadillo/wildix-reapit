import React, { useState, ChangeEvent } from 'react'
import { Button, Title, Subtitle, Input } from '@reapit/elements'

const WildixSettings: React.FC = () => {
  const [subdomain, setSubdomain] = useState(() => localStorage.getItem('wildixSubdomain') || '')
  const [clientId, setClientId] = useState(() => localStorage.getItem('wildixClientId') || '')

  const handleConnect = () => {
    if (!subdomain || !clientId) {
      alert('Please enter both subdomain and client ID.')
      return
    }

    localStorage.setItem('wildixSubdomain', subdomain)
    localStorage.setItem('wildixClientId', clientId)

    const redirectUri = encodeURIComponent('https://reapit.storah.info/wildix-callback')
    const authUrl = `https://${subdomain}.wildixin.com/authorization/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

    window.location.href = authUrl
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <Title>Wildix Setup</Title>
      <Subtitle>Enter your Wildix PBX subdomain and OAuth client ID</Subtitle>

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>PBX Subdomain</label>
      <Input
        placeholder="e.g. mycompany"
        value={subdomain}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSubdomain(e.target.value)}
      />

      <label style={{ display: 'block', margin: '1rem 0 0.5rem' }}>OAuth Client ID</label>
      <Input
        placeholder="Paste your Wildix OAuth client ID"
        value={clientId}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setClientId(e.target.value)}
      />

      <Button intent="primary" style={{ marginTop: '1.5rem' }} onClick={handleConnect}>
        Connect to Wildix
      </Button>
    </div>
  )
}

export default WildixSettings
