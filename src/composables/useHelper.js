export const getYears = (startDate, endDate) => {
  const d1 = new Date(startDate)
  const d2 = new Date(endDate)

  const [earlier, later] = d1 > d2 ? [d2, d1] : [d1, d2]

  let years = later.getFullYear() - earlier.getFullYear()

  const hasNotPassedMonth = later.getMonth() < earlier.getMonth()
  const isSameMonthButNotDay =
    later.getMonth() === earlier.getMonth() && later.getDate() < earlier.getDate()

  if (hasNotPassedMonth || isSameMonthButNotDay) {
    years--
  }

  return years
}
