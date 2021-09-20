import styles from './MainContainer.module.scss'
import classNames from 'classnames/bind'

export default class MainContainer {
  constructor($target: HTMLElement) {
    const calendar = document.createElement('section')
    const cx = classNames.bind(styles)
    calendar.className = cx('calendar')
    $target.appendChild(calendar)

    console.log(document.querySelector(`.${cx('main-page')}`))
    calendar.innerText = 'ha'
  }
}
