import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}h ${mins}min`
  }
  return `${mins}min`
}

export function generateMockHash(): string {
  return '0x' + Array.from({ length: 8 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}

export function generateMockIPFS(): string {
  return 'Qm' + Array.from({ length: 44 }, () => 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
      Math.floor(Math.random() * 62)
    ]
  ).join('')
}

export function getMoodEmoji(score: number): string {
  if (score >= 8) return '😊'
  if (score >= 6) return '🙂'
  if (score >= 4) return '😐'
  if (score >= 2) return '😔'
  return '😢'
}

export function getMoodColor(score: number): string {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-yellow-600'
  if (score >= 4) return 'text-orange-600'
  return 'text-red-600'
}

export function getMoodLabel(score: number): string {
  if (score >= 8) return 'Great'
  if (score >= 6) return 'Good'
  if (score >= 4) return 'Okay'
  if (score >= 2) return 'Low'
  return 'Very Low'
}
