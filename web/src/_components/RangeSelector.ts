import styles from './RangeSelector.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

export default class RangeSelctor {
  constructor($target: HTMLElement) {
    const range: HTMLElement = document.createElement('div')
    range.className = cx('range-selector')
    this.appendTwoButtons(range)

    $target.appendChild(range)
  }

  appendTwoButtons($target: HTMLElement) {
    const leftButton = document.createElement('button')
    leftButton.innerText = '월'
    leftButton.className = cx('left-button')
    $target.appendChild(leftButton)
    const rightButton = document.createElement('button')
    rightButton.innerText = '일'
    rightButton.className = cx('right-button')
    $target.appendChild(rightButton)
  }
}
