import axios from 'axios'

const API_BASE = process.env.API_URL || 'http://localhost:3001/api'

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
})

export async function sendOtp(phone: string) {
  return api.post('/auth/send-otp', { phone })
}

export async function verifyOtp(phone: string, otp: string) {
  return api.post('/auth/verify-otp', { phone, otp })
}

export async function getServices() {
  return api.get('/services')
}
