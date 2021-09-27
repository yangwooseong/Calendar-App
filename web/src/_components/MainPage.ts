import Component from '../_core/Component'
import Header from './Header'
import MainContainer from './MainContainer'

interface IMonthAndYear {
  month: number
  year: number
}

export default class MainPage extends Component {
  state: any
  constructor($target: HTMLElement, props?: any) {
    super($target, props)
    this.handleClick = this.handleClick.bind(this)
    this.render()
  }

  setup() {
    this.state as IMonthAndYear
    this.state = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }
  }

  setEvent() {}

  handleClick(e: any): void {
    e.target as any // FIX ME: TYPE 변경
    if (e.target.className === 'left-arrow') {
      const year =
        this.state.month === 1 ? this.state.year - 1 : this.state.year
      const month = this.state.month === 1 ? 12 : this.state.month - 1
      this.setState({
        month,
        year,
      })
    }
  }

  template() {
    return `
      <div class='header'></div>
      <div class='main-container'></div>
    `
  }

  appendChildren() {
    const headerTarget: HTMLElement = this.$target.querySelector('.header')!
    const headerProps = {
      ...this.state,
      handleClick: this.handleClick,
    }
    const mainContainerTarget: HTMLElement =
      this.$target.querySelector('.main-container')!
    new Header(headerTarget, headerProps)
    new MainContainer(mainContainerTarget, this.state)
  }
}
