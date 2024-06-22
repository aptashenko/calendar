import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekday from 'dayjs/plugin/weekday'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(isLeapYear)
dayjs.extend(isoWeek)
export function useDaysGrid() {
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const daysGrid = ({month, year}) => {

    const startOfMonth = dayjs(new Date(year, month, 1))
    const daysInMonth = startOfMonth.daysInMonth();
    const startDayOfWeek = startOfMonth.isoWeekday() - 1
    const daysArray = []

    // Добавляем пустые ячейки до начала текущего месяца
    for (let i = 0; i < startDayOfWeek; i++) {
      daysArray.push({ date: '', isCurrentMonth: false })
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({ date: `${year}-${month < 10 ? '0' + month : month}-${i < 10 ? '0'+i : i}`, isCurrentMonth: true })
    }

    // Вычисляем количество оставшихся ячеек для завершения сетки
    const totalCells = daysArray.length
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)

    // Добавляем пустые ячейки после окончания текущего месяца
    for (let i = 0; i < remainingCells; i++) {
      daysArray.push({ date: '', isCurrentMonth: false })
    }

    return daysArray
  }

  return {daysGrid, dayNames}
}
