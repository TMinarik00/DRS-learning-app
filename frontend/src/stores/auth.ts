import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api'

export interface User {
  id: string
  username: string
  email: string
  xp: number
  streak: number
  avatarColor: string
  createdAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const checked = ref(false)

  async function loadUser() {
    const token = localStorage.getItem('token')
    if (!token) { checked.value = true; return }
    try {
      const { data } = await api.get('/auth/me')
      user.value = data.user
    } catch {
      localStorage.removeItem('token')
    } finally {
      checked.value = true
    }
  }

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    user.value = data.user
  }

  async function register(username: string, email: string, password: string) {
    const { data } = await api.post('/auth/register', { username, email, password })
    localStorage.setItem('token', data.token)
    user.value = data.user
  }

  function logout() {
    localStorage.removeItem('token')
    user.value = null
    window.location.href = '/login'
  }

  function updateUser(updates: Partial<User>) {
    if (user.value) user.value = { ...user.value, ...updates }
  }

  return { user, checked, loadUser, login, register, logout, updateUser }
})
