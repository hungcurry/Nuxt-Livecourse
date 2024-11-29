import type { TBookingResult } from '@/types/dataTypes'

export const BookingStore = defineStore('booking', () => {
  const bookingResult = ref<TBookingResult | null>(null)
  return {
    bookingResult,
  }
})
