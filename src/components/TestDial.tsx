import React, { useState } from 'react'
import { originateCall } from '../core/wildix-api'

const TestDial: React.FC = () => {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDial = async () => {
    setResult(null)
    setError(null)
    try {
      const response = await originateCall(number)
      console.log('📞 Call response:', response)
      setResult(JSON.stringify(response, null, 2))
    } catch (err: any) {
      console.error('❌ Error:', err.message)
      setError(err.message)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Test Originate Call</h2>
      <input
        type="text"
        value={number}
        placeholder="Enter number or extension"
        onChange={(e) => setNumber(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button style={{ marginLeft: '1rem' }} onClick={handleDial}>
        Call
      </button>

      {result && (
        <pre style={{ background: '#e1ffe1', padding: '1rem', marginTop: '1rem' }}>{result}</pre>
      )}
      {error && (
        <pre style={{ background: '#ffe1e1', padding: '1rem', marginTop: '1rem' }}>{error}</pre>
      )}
    </div>
  )
}

export default TestDial
