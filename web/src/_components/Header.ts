import RangeSelctor from './RangeSelector'
import TimeRange from './TimeRange'
import { IMonthAndYear } from '../_interfaces/IMonthAndYear'

export default class Header {
  monthAndYear: IMonthAndYear
  handleClick: (e: Event) => void
  nav: HTMLHeadElement
  $target: HTMLElement
  constructor(
    $target: HTMLElement,
    monthAndYear: IMonthAndYear,
    handleClick: (e: Event) => void
  ) {
    const nav: HTMLHeadElement = document.createElement('header')
    nav.className = 'header'
    $target.appendChild(nav)

    this.monthAndYear = monthAndYear
    this.handleClick = handleClick
    this.nav = nav
    this.$target = $target

    this.render()
  }

  template() {
    this.nav.innerHTML = `
    <div class='time-range'></div>
    <div class='range-selector'></div>
    `
  }

  render() {
    this.template()

    const nav: HTMLHeadElement = this.$target.querySelector('.header')!
    const timeRange: HTMLDivElement = this.$target.querySelector('.time-range')!
    const RangeSelector: HTMLDivElement =
      this.$target.querySelector('.range-selector')!

    new TimeRange(timeRange, this.monthAndYear, this.handleClick)
    // new RangeSelctor(nav)
  }
}
