// src/app.tsx (simplified example)
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import RoutesComponent from './core/routes'



const App: React.FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  
  if (!connectSession) {
    return <div>Loading...</div> // or a spinner/loading UI
  }
  
  
  // If we reach here, user is authenticated via Reapit SSO
  return (
    <RoutesComponent />   // your main app content goes here (router with pages)
  )
}
