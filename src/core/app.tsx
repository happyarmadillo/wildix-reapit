import React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import RoutesComponent from './routes'

const App: React.FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  // Show loading while Reapit Connect is resolving the session
  if (!connectSession) {
    return <div>Loading Reapit Connect...</div>
  }

  return <RoutesComponent />
}

export default App
