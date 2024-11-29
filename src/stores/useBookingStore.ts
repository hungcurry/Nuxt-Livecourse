import type { TBookingResult } from '@/types/apiTypes'

export const BookingStore = defineStore('booking', () => {
  const bookingResult = ref<TBookingResult>({
    name: '',
    user: {
      name: '',
      phone: '',
    },
    areaInfo: '',
    bedInfo: '',
    layoutInfo: [],
    facilityInfo: [],
  })

  // 其他現有的代碼...

  return {
    bookingResult,
    // 其他返回值...
  }
})
