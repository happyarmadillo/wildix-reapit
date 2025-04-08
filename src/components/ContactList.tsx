import React, { useRef } from 'react'
import { Table, Button, Title, Subtitle } from '@reapit/elements'

interface Contact {
  name: string
  phone: string
}

const mockContacts: Contact[] = [
  { name: 'Alice Smith', phone: '0123456789' },
  { name: 'Bob Johnson', phone: '02079461234' },
  { name: 'Charlie Brown', phone: '07500600600' }
]

const ContactList: React.FC = () => {
  const wildixWindowRef = useRef<Window | null>(null)
  const subdomain = localStorage.getItem('wildixSubdomain')

  const handleCall = (phone: string) => {
    if (!subdomain) return alert('No Wildix PBX subdomain configured.')

    const url = `https://${subdomain}.wildixin.com`

    // Open or reuse the Wildix tab
    if (!wildixWindowRef.current || wildixWindowRef.current.closed) {
      wildixWindowRef.current = window.open(url, '_blank')
    } else {
      wildixWindowRef.current.focus()
    }

    // For future use: send phone number via postMessage
    console.log(`📞 Call requested: ${phone}`)
    // wildixWindowRef.current?.postMessage({ action: 'dial', number: phone }, '*')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Title>Contact List</Title>
      <Subtitle>Click to dial</Subtitle>

      <Table
  rows={mockContacts.map((contact) => ({
    cells: [
      { label: contact.name },
      { label: contact.phone },
      {
        label: '', // satisfy type
        customCell: (
          <Button intent="primary" onClick={() => handleCall(contact.phone)}>
            Call
          </Button>
        ),
      },
    ],
  }))}
/>




    </div>
  )
}

export default ContactList
