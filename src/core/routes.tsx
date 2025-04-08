import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../components/LoginPage'
import PrivateRouteWrapper from './private-route-wrapper'
import TestDial from '../components/TestDial'
import WildixSettings from '../components/WildixSettings'
import WildixCallback from '../components/WildixCallback' 
import Dashboard from '../components/Dashboard'
import ContactList from '../components/ContactList' // Optional: click-to-dial test page

const RoutesComponent = () => {
  const wildixSubdomain = localStorage.getItem('wildixSubdomain')
  const wildixAccessToken = localStorage.getItem('wildixAccessToken')

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            wildixSubdomain && wildixAccessToken
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/wildix-settings" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wildix-settings" element={<WildixSettings />} />
        <Route path="/wildix-callback" element={<WildixCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/click-to-dial" element={<ContactList />} />
        <Route path="/test-dial" element={<TestDial />} />

        {/* Optional: Reapit-protected routes (Contacts etc.) */}
        <Route element={<PrivateRouteWrapper />}>
          <Route
            path="contacts"
            lazy={async () => (await import('../components/contacts/routeProps')).ViewContactDesktopRedirectRouteProps}
          >
            <Route index lazy={async () => (await import('../components/contacts/routeProps')).ContactListPageRouteProps} />
            <Route path="new" lazy={async () => (await import('../components/contacts/routeProps')).CreateContactPageRouteProps} />
            <Route path=":contactId">
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="*" lazy={async () => (await import('../components/contacts/routeProps')).ContactDetailPageRouteProps} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesComponent
