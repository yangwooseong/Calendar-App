import OneDay from './OneDay'
import Component from '../_core/Component'
import DayModal from './DayModal'
import api from './api'

export default class MainContainer extends Component {
  constructor($target: HTMLElement, props: any) {
    super($target, props)
  }

  setup() {
    this.state = {
      dateRange: {},
    }
  }

  template() {
    return `
      <section class='calendar'></section>
    `
  }

  async requestData(update: boolean = false) {
    let { year, month } = this.props
    month = month - 1
    const firstDate = new Date(year, month, 1)
    const dayOfFirstDate = firstDate.getDay()

    let lastSundayOfLastMonth = new Date(year, month, 1)
    lastSundayOfLastMonth.setDate(
      new Date(year, month, 1).getDate() - dayOfFirstDate
    )
    const lastSundayDate = lastSundayOfLastMonth.getDate()

    const range = this.getDateRange(lastSundayDate)
    const dateRange = await api.planList({
      startDate: range[0],
      endDate: range[1],
    })
    console.log('called')
    if (Object.keys(this.state.dateRange).length === 0 || update) {
      this.setState({ dateRange })
    }
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
      const span: HTMLSpanElement = document.createElement('div')
      span.innerText = day
      dayHeader.appendChild(span)
    })
  }

  getDateRange(date: number) {
    let { year, month } = this.props
    month = month - 1

    const newYear = month === 0 ? year - 1 : year
    const newMonth = month === 0 ? 11 : month - 1

    let tmp = new Date(newYear, newMonth, date)
    const firstDate = this.getDateTime(newYear, newMonth, date)
    const lastDate = new Date(tmp.setDate(tmp.getDate() + 34))

    return [
      firstDate,
      lastDate.getFullYear().toString() +
        ('0' + (lastDate.getMonth() + 1).toString()).slice(-2) +
        ('0' + lastDate.getDate().toString()).slice(-2),
    ]
  }

  getDateTime(year: number, month: number, date: number) {
    return (
      year.toString() +
      ('0' + (month + 1).toString()).slice(-2) +
      ('0' + date.toString()).slice(-2)
    )
  }

  async addCalendarContent($target: HTMLElement) {
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

    const dateRange = this.getDateRange(lastSundayDate)
    await this.requestData()
    // 지난 달
    for (let i = 0; i < dayOfFirstDate; i++) {
      const oneday = document.createElement('div')
      oneday.className = 'one-day'
      content.appendChild(oneday)

      const newYear = month === 0 ? year - 1 : year
      const newMonth = month === 0 ? 11 : month - 1
      const dateTime = this.getDateTime(newYear, newMonth, lastSundayDate + i)
      const oneDayProps = {
        dateTime,
        plans: this.state.dateRange[dateTime],
      }
      new OneDay(oneday, oneDayProps)
    }
    if (dayOfFirstDate + lastDate >= 35) {
      lastDate = lastDate - (dayOfFirstDate + lastDate - 35)
    }

    // 이번 달
    for (let i = 1; i <= lastDate; i++) {
      const oneday = document.createElement('div')
      oneday.className = 'one-day'
      content.appendChild(oneday)

      const dateTime = this.getDateTime(year, month, i)
      const oneDayProps = {
        dateTime,
        plans: this.state.dateRange[dateTime],
      }
      new OneDay(oneday, oneDayProps)
    }

    // 다음 달
    for (let i = 1; i <= 35 - dayOfFirstDate - lastDate; i++) {
      const oneday = document.createElement('div')
      oneday.className = 'one-day'
      content.appendChild(oneday)

      const newYear = month === 11 ? year + 1 : year
      const newMonth = month === 11 ? 0 : month + 1
      const dateTime = this.getDateTime(newYear, newMonth, i)
      const oneDayProps = {
        dateTime,
        plans: this.state.dateRange[dateTime],
      }
      new OneDay(oneday, oneDayProps)
    }
  }

  setEvent() {
    this.$target.addEventListener('click', (e: any) => {
      if (e.target.classList.contains('one-day')) {
        console.log(e.target)
        const modalWrapper: HTMLElement =
          document.querySelector('.modal-wrapper')!
        const dateTime =
          this.props.year +
          ('0' + this.props.month).slice(-2) +
          ('0' + e.target.querySelector('span').innerText.toString()).slice(-2)
        const dayModalProps = {
          type: 'Add',
          dateTime,
          requestData: this.requestData.bind(this),
        }
        new DayModal(modalWrapper, dayModalProps)
      }
    })
  }
}
