import styles from './TimeRange.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
export default class TimeRange {
  constructor($target: HTMLElement) {
    const range: HTMLElement = document.createElement('div')
    range.className = cx('time-range')
    range.innerHTML = `<span>2018년 11월</span>`

    this.appendArrowIcon(range)

    $target.appendChild(range)
  }

  appendArrowIcon($target: HTMLElement) {
    const leftArrow = document.createElement('span')
    leftArrow.innerText = '<'
    leftArrow.className = cx('left-arrow')
    $target.insertBefore(leftArrow, $target.firstElementChild)
    const rightArrow = document.createElement('span')
    rightArrow.innerText = '>'
    rightArrow.className = cx('right-arrow')
    $target.insertBefore(leftArrow, $target.firstElementChild)
    $target.appendChild(rightArrow)
  }
}
