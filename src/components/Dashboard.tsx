import React, { useState } from 'react'
import {
  originateCall,
  hangupCall,
  holdCall,
  resumeCall,
  transferCall,
} from '../core/wildix-api'

const Dashboard: React.FC = () => {
  const [dialNumber, setDialNumber] = useState('')
  const [currentCallId, setCurrentCallId] = useState<string | null>(null)
  const [callStatus, setCallStatus] = useState<'idle' | 'active' | 'held'>('idle')
  const [transferTo, setTransferTo] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleDial = async () => {
    setError(null)
    try {
      const res = await originateCall(dialNumber)
      console.log('📞 Call originated:', res)
      if (res.callid) {
        setCurrentCallId(res.callid)
        setCallStatus('active')
      } else {
        throw new Error('Call ID not returned.')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleHangup = async () => {
    if (!currentCallId) return
    try {
      await hangupCall(currentCallId)
      setCurrentCallId(null)
      setCallStatus('idle')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleToggleHold = async () => {
    if (!currentCallId) return
    try {
      if (callStatus === 'active') {
        await holdCall(currentCallId)
        setCallStatus('held')
      } else {
        await resumeCall(currentCallId)
        setCallStatus('active')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleTransfer = async () => {
    if (!currentCallId || !transferTo) return
    try {
      await transferCall(currentCallId, transferTo)
      setTransferTo('')
      setCurrentCallId(null)
      setCallStatus('idle')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h2>Wildix Dashboard</h2>

      <div>
        <label>Number to dial:</label>
        <input
          type="text"
          value={dialNumber}
          onChange={(e) => setDialNumber(e.target.value)}
          placeholder="e.g. 1002 or +44123456789"
          style={{ marginRight: '1rem', width: '70%' }}
        />
        <button onClick={handleDial} disabled={!!currentCallId}>
          Call
        </button>
      </div>

      {currentCallId && (
        <>
          <div style={{ marginTop: '2rem' }}>
            <strong>Status:</strong>{' '}
            {callStatus === 'active' ? 'On Call' : callStatus === 'held' ? 'On Hold' : 'Idle'}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleHangup}>Hang Up</button>
            <button onClick={handleToggleHold} style={{ marginLeft: '1rem' }}>
              {callStatus === 'active' ? 'Hold' : 'Resume'}
            </button>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <label>Transfer to:</label>
            <input
              type="text"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              placeholder="e.g. 1003"
              style={{ marginRight: '1rem' }}
            />
            <button onClick={handleTransfer}>Transfer</button>
          </div>
        </>
      )}

      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  )
}

export default Dashboard
