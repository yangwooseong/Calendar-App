import styles from './OneDay.module.scss'
import classNames from 'classnames/bind'
import DayModal from './DayModal'
import { IDate } from '../_interfaces/IDate'
const cx = classNames.bind(styles)

export default class OneDay {
  oneDay: HTMLSpanElement
  dateObj: IDate

  constructor($target: HTMLElement, dateObj: IDate) {
    const oneDay = document.createElement('span')
    oneDay.className = cx('one-day')
    oneDay.innerText = dateObj.date
    this.oneDay = oneDay
    this.dateObj = dateObj

    $target.appendChild(oneDay)

    this.render()
  }

  render() {
    const mainPage: HTMLElement = document.querySelector('.main-page')!
    this.oneDay.addEventListener('click', () => {
      const dayModal = new DayModal(mainPage, 'Add', this.dateObj)
    })
  }
}
