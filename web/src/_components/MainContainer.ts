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
    for (let i = 0; i < 35; i++) {
      const date = {
        day: i.toString(),
        month: this.month.toString(),
      }
      const td = new OneDay(content, date)
    }
  }
}
