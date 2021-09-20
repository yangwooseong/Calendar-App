import RangeSelctor from './RangeSelector'
import TimeRange from './TimeRange'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'

export default class Header {
  constructor($target: HTMLElement) {
    const nav: HTMLElement = document.createElement('header')
    const cx = classNames.bind(styles)
    nav.className = cx('header')
    $target.appendChild(nav)

    const timeRange = new TimeRange(nav)
    const rangeSelector = new RangeSelctor(nav)
  }
}
