import OneDay from './OneDay'
import Component from '../_core/Component'
import DayModal from './DayModal'

export default class MainContainer extends Component {
  constructor($target: HTMLElement, props: any) {
    super($target, props)
  }

  template() {
    return `
      <section class='calendar'></section>
    `
  }

  appendChildren() {
    const mainContainerTarget: HTMLElement =
      this.$target.querySelector('.calendar')!
    this.addCalendarHeader(mainContainerTarget)
    this.addCalendarContent(mainContainerTarget)
  }

  addCalendarHeader($target: HTMLElement) {
    const arr = ['일', '월', '화', '수', '목', '금', '토']
    const dayHeader = document.createElement('header')
    dayHeader.className = 'calendar-header'
    $target.appendChild(dayHeader)
    arr.forEach((day, idx) => {
      const span: HTMLSpanElement = document.createElement('span')
      span.innerText = day
      dayHeader.appendChild(span)
    })
  }

  addCalendarContent($target: HTMLElement) {
    const content = document.createElement('section')
    content.className = 'calendar-content'
    $target.appendChild(content)

    let { year, month } = this.props
    month = month - 1
    const firstDate = new Date(year, month, 1)
    let lastDate = new Date(year, month + 1, 0).getDate()
    const dayOfFirstDate = firstDate.getDay()

    let lastSundayOfLastMonth = new Date(year, month, 1)
    lastSundayOfLastMonth.setDate(
      new Date(year, month, 1).getDate() - dayOfFirstDate
    )
    const lastSundayDate = lastSundayOfLastMonth.getDate()

    // 지난 달
    for (let i = 0; i < dayOfFirstDate; i++) {
      const oneday = document.createElement('span')
      oneday.className = 'one-day'
      content.appendChild(oneday)

      const newYear = month === 0 ? year - 1 : year
      const newMonth = month === 0 ? 11 : month - 1
      const dateTime =
        newYear.toString() +
        ('0' + (newMonth + 1).toString()).slice(-2) +
        ('0' + (lastSundayDate + i).toString()).slice(-2)
      new OneDay(oneday, dateTime)
    }
    if (dayOfFirstDate + lastDate >= 35) {
      lastDate = lastDate - (dayOfFirstDate + lastDate - 35)
    }

    // 이번 달
    for (let i = 1; i <= lastDate; i++) {
      const oneday = document.createElement('span')
      oneday.className = 'one-day'
      content.appendChild(oneday)

      const dateTime =
        year.toString() +
        ('0' + (month + 1).toString()).slice(-2) +
        ('0' + i.toString()).slice(-2)
      new OneDay(oneday, dateTime)
    }

    // 다음 달
    for (let i = 1; i <= 35 - dayOfFirstDate - lastDate; i++) {
      const oneday = document.createElement('span')
      oneday.className = 'one-day'
      content.appendChild(oneday)

      const newYear = month === 11 ? year + 1 : year
      const newMonth = month === 11 ? 0 : month + 1
      const dateTime =
        newYear.toString() +
        ('0' + (newMonth + 1).toString()).slice(-2) +
        ('0' + i.toString()).slice(-2)
      new OneDay(oneday, dateTime)
    }
  }

  setEvent() {
    this.$target.addEventListener('click', (e: any) => {
      if (e.target.classList.contains('one-day')) {
        const mainPage: HTMLElement = document.querySelector('.main-page')!
        const dateTime =
          this.props.year +
          ('0' + this.props.month).slice(-2) +
          ('0' + e.target.innerText.toString()).slice(-2)
        new DayModal(mainPage, 'Add', dateTime)
      }
    })
  }

  displayPlan() {
    console.log('here')
  }
}
