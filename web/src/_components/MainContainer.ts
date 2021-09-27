import styles from './MainContainer.module.scss'
import classNames from 'classnames/bind'
import OneDay from './OneDay'
import { IMonthAndYear } from '../_interfaces/IMonthAndYear'

const cx = classNames.bind(styles)
export default class MainContainer {
  monthAndYear: IMonthAndYear

  constructor($target: HTMLElement, monthAndYear: IMonthAndYear) {
    const calendar = document.createElement('section')
    calendar.className = cx('calendar')
    this.monthAndYear = monthAndYear
    this.addCalendarHeader(calendar)
    this.addCalendarContent(calendar)

    $target.appendChild(calendar)
  }

  addCalendarHeader($target: HTMLElement) {
    const arr = ['일', '월', '화', '수', '목', '금', '토']
    const dayHeader = document.createElement('header')
    dayHeader.className = cx('calendar-header')
    $target.appendChild(dayHeader)
    arr.forEach((day, idx) => {
      const span: HTMLSpanElement = document.createElement('span')
      span.innerText = day
      dayHeader.appendChild(span)
    })
  }

  addCalendarContent($target: HTMLElement) {
    const content = document.createElement('section')
    content.className = cx('calendar-content')
    $target.appendChild(content)

    const year = this.monthAndYear.year
    const month = this.monthAndYear.month - 1
    const firstDate = new Date(year, month, 1)
    let lastDate = new Date(year, month + 1, 0).getDate()
    const dayOfFirstDate = firstDate.getDay()

    let lastSundayOfLastMonth = new Date(year, month, 1)
    lastSundayOfLastMonth.setDate(
      new Date(year, month, 1).getDate() - dayOfFirstDate
    )
    const lastSundayDate = lastSundayOfLastMonth.getDate()

    for (let i = 0; i < dayOfFirstDate; i++) {
      const newYear = month === 0 ? year - 1 : year
      const newMonth = month === 0 ? 11 : month - 1
      const dateTime =
        newYear.toString() +
        ('0' + (newMonth + 1).toString()).slice(-2) +
        ('0' + (lastSundayDate + i).toString()).slice(-2)
      new OneDay(content, dateTime)
    }
    if (dayOfFirstDate + lastDate >= 35) {
      lastDate = lastDate - (dayOfFirstDate + lastDate - 35)
    }
    for (let i = 1; i <= lastDate; i++) {
      const dateTime =
        year.toString() +
        ('0' + (month + 1).toString()).slice(-2) +
        ('0' + i.toString()).slice(-2)
      new OneDay(content, dateTime)
    }
    console.log(dayOfFirstDate, lastDate)
    for (let i = 1; i <= 35 - dayOfFirstDate - lastDate; i++) {
      const newYear = month === 11 ? year + 1 : year
      const newMonth = month === 11 ? 0 : month + 1
      const dateTime =
        newYear.toString() +
        ('0' + (newMonth + 1).toString()).slice(-2) +
        ('0' + i.toString()).slice(-2)
      new OneDay(content, dateTime)
    }
  }

  displayPlan() {
    console.log('here')
  }
}
