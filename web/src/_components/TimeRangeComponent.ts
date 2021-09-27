import Component from '../_core/Component'
import { IMonthAndYear } from '../_interfaces/IMonthAndYear'

export default class TimeRangeComponent extends Component {
  handleClick: (e: Event) => void

  constructor($target: HTMLElement, props: any) {
    super($target, props)
    const { month, year, handleClick } = props
    this.handleClick = handleClick
  }

  template() {
    return `
    <div class='left-arrow'> 
      <
    </div>
    <div>${this.props.year}년 ${this.props.month}월</div>
    <div class='right-arrow'>
      >
    </div>
    `
  }

  setEvent() {
    this.$target.addEventListener('click', (e: any) => {
      if (e.target.classList.contains('left-arrow')) {
        this.handleClick(e)
      }
    })
  }
}
