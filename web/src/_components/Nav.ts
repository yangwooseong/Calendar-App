import RangeSelctor from './RangeSelector'
import TimeRange from './TimeRange'

export default class Nav {
  constructor($target: HTMLElement) {
    const nav: HTMLElement = document.createElement('nav')
    $target.appendChild(nav)

    const timeRange = new TimeRange(nav)
    const rangeSelector = new RangeSelctor(nav)
  }
}
