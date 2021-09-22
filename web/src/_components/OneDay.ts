import styles from './OneDay.module.scss'
import classNames from 'classnames/bind'
import DayModal from './DayModal'
const cx = classNames.bind(styles)

export default class OneDay {
  oneDay: HTMLSpanElement

  constructor($target: HTMLElement, date: string) {
    const oneDay = document.createElement('span')
    oneDay.className = cx('one-day')
    oneDay.innerText = date
    this.oneDay = oneDay
    $target.appendChild(oneDay)

    this.render()
  }

  render() {
    const mainPage: HTMLElement = document.querySelector('.main-page')!
    this.oneDay.addEventListener('click', () => {
      const dayModal = new DayModal(mainPage, 'Add')
    })
  }
}
