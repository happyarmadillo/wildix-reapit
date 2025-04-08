const getBaseUrl = (): string => {
  const subdomain = localStorage.getItem('wildixSubdomain')
  if (!subdomain) throw new Error('Wildix subdomain not set')
  return `https://${subdomain}.wildixin.com/api/v1`
}

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('wildixAccessToken')
  if (!token) throw new Error('Wildix access token not set')

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }
}

const handleResponse = async (res: Response) => {
  const text = await res.text()
  try {
    const data = JSON.parse(text)
    if (!res.ok) throw new Error(data.reason || data.error || res.statusText)
    return data
  } catch {
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`)
    return text
  }
}

// 📞 Originate call
export const originateCall = async (number: string) => {
  const form = new URLSearchParams()
  form.append('number', number)

  const res = await fetch(`${getBaseUrl()}/Originate`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: form.toString(),
  })

  return handleResponse(res)
}

// 🔴 Hang up call
export const hangupCall = async (callId: string) => {
  const form = new URLSearchParams()
  form.append('callid', callId)

  const res = await fetch(`${getBaseUrl()}/Hangup`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: form.toString(),
  })

  return handleResponse(res)
}

// ⏸ Hold call
export const holdCall = async (callId: string) => {
  const form = new URLSearchParams()
  form.append('callid', callId)

  const res = await fetch(`${getBaseUrl()}/Hold`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: form.toString(),
  })

  return handleResponse(res)
}

// ▶️ Resume call
export const resumeCall = async (callId: string) => {
  const form = new URLSearchParams()
  form.append('callid', callId)

  const res = await fetch(`${getBaseUrl()}/UnHold`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: form.toString(),
  })

  return handleResponse(res)
}

// 🔁 Transfer call
export const transferCall = async (callId: string, target: string) => {
  const form = new URLSearchParams()
  form.append('callid', callId)
  form.append('number', target)

  const res = await fetch(`${getBaseUrl()}/Transfer`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: form.toString(),
  })

  return handleResponse(res)
}
