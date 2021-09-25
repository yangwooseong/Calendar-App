import { threadId } from 'worker_threads'
import { IMonthAndYear } from '../_interfaces/IMonthAndYear'

export default class TimeRange {
  monthAndYear: IMonthAndYear
  handleClick: (e: Event) => void
  $target: HTMLElement

  // range: HTMLDivElement

  constructor(
    $target: HTMLElement,
    monthAndYear: IMonthAndYear,
    handleClick: (e: Event) => void
  ) {
    // const range: HTMLDivElement = document.createElement('div')
    // range.className = 'time-range'
    // $target.appendChild(range)
    this.monthAndYear = monthAndYear
    this.handleClick = handleClick
    this.$target = $target
    // this.range = range

    this.render()
  }

  template() {
    console.log(this.monthAndYear)
    console.log('called')
    console.log(this.$target)
    this.$target.innerHTML = `<span>2018년 ${this.monthAndYear.month}월</span>`
    this.appendArrowIcon(this.$target)
  }

  appendArrowIcon($target: HTMLElement) {
    const leftArrow = document.createElement('span')
    leftArrow.innerText = '<'
    leftArrow.className = 'left-arrow'
    $target.insertBefore(leftArrow, $target.firstElementChild)
    const rightArrow = document.createElement('span')
    rightArrow.innerText = '>'
    rightArrow.className = 'right-arrow'
    $target.insertBefore(leftArrow, $target.firstElementChild)
    $target.appendChild(rightArrow)
  }

  setEvent() {
    document.querySelector('.left-arrow')?.addEventListener('click', (e) => {
      this.handleClick(e)
    })
  }

  render() {
    this.template()
    this.setEvent()
  }
}
