import RangeSelctor from './RangeSelector'
import TimeRange from './TimeRange'
import Component from '../_core/Component'

export default class Header extends Component {
  constructor($target: HTMLElement, props: any) {
    super($target, props)

    this.render()
  }

  template() {
    return `
    <div class='time-range'></div>
    <div class='range-selector'></div>
    `
  }

  appendChildren() {
    const timeRangeTarget: HTMLElement =
      this.$target.querySelector('.time-range')!
    const rangeSelectorTarget: HTMLDivElement =
      this.$target.querySelector('.range-selector')!
    new TimeRange(timeRangeTarget, this.props)
    new RangeSelctor(rangeSelectorTarget)
  }
}
