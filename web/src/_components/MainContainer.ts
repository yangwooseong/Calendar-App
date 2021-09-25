import styles from './MainContainer.module.scss'
import classNames from 'classnames/bind'
import OneDay from './OneDay'

const cx = classNames.bind(styles)

export default class MainContainer {
  month: number
  constructor($target: HTMLElement, month: number) {
    const calendar = document.createElement('section')
    calendar.className = cx('calendar')
    this.month = month
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
    // const year = 2021
    // const month = moment().month().toString()
    // const firstDay = moment([year, month, 1])
    // const lastDate = moment([year, month, 1])
    //   .add('months', 1)
    //   .subtract('days', 1)
    //   .date()
    // const firstDateOfNextMonth = console.log(lastDate)
    // const day = firstDay.day()
    // const lastSundayOfLastMonth = firstDay.subtract('days', day).date()
    const year = 2021
    const date = new Date()
    const month = date.getMonth()
    const firstDate = new Date(year, month, 1)
    const lastDate = new Date(year, month + 1, 0).getDate()
    const dayOfFirstDate = firstDate.getDay()

    let lastSundayOfLastMonth = new Date(year, month, 1)
    lastSundayOfLastMonth.setDate(
      new Date(year, month, 1).getDate() - dayOfFirstDate
    )
    const lastSundayDate = lastSundayOfLastMonth.getDate()

    for (let i = 0; i < dayOfFirstDate; i++) {
      const dateObj = {
        date: (lastSundayDate + i).toString(),
        month: month.toString(),
      }
      const td = new OneDay(content, dateObj)
    }
    for (let i = 1; i <= lastDate; i++) {
      const dateObj = {
        date: i.toString(),
        month: month.toString(),
      }
      const td = new OneDay(content, dateObj)
    }
    for (let i = 1; i <= 35 - dayOfFirstDate - lastDate; i++) {
      const dateObj = {
        date: i.toString(),
        month: month === 11 ? '0' : (month + 1).toString(),
      }
      new OneDay(content, dateObj)
    }
  }
}
