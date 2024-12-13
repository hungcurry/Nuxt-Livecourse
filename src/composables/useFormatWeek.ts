export function useFormatWeek() {
  const formatDateWeekday = (dateString: string) => {
    const date = new Date(dateString) // 將字串轉換為日期物件
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

    const year = date.getFullYear()
    const month = date.getMonth() + 1 // 月份是 0 開始
    const day = date.getDate()
    const weekday = weekdays[date.getDay()] // 取得對應的星期幾

    return `${month} 月 ${day} 日 ${weekday}`
  }

  return {
    formatDateWeekday,
  }
}
