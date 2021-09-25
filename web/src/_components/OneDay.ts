import styles from './OneDay.module.scss'
import classNames from 'classnames/bind'
import DayModal from './DayModal'
import { IDate } from '../_interfaces/IDate'
const cx = classNames.bind(styles)

export default class OneDay {
  oneDay: HTMLSpanElement
  dateTime: string

  constructor($target: HTMLElement, dateTime: string) {
    const oneDay = document.createElement('span')
    oneDay.className = cx('one-day')
    oneDay.innerText = dateTime.slice(-2).startsWith('0')
      ? dateTime.slice(-1)
      : dateTime.slice(-2)
    this.oneDay = oneDay
    this.dateTime = dateTime

    $target.appendChild(oneDay)

    this.render()
  }

  render() {
    const mainPage: HTMLElement = document.querySelector('.main-page')!
    this.oneDay.addEventListener('click', () => {
      const dayModal = new DayModal(mainPage, 'Add', this.dateTime)
    })
  }
}
