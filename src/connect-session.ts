// src/connect-session.ts
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: import.meta.env.VITE_CONNECT_CLIENT_ID,
  connectUserPoolId: import.meta.env.VITE_CONNECT_USER_POOL_ID,
  connectOAuthUrl: import.meta.env.VITE_CONNECT_OAUTH_URL,
  connectLoginRedirectPath: '/',      // after login, go to app root or a specific route
  connectLogoutRedirectPath: '/login' // after logout, route to a login page if needed
})
