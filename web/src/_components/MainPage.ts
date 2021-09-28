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
  }

  setup() {
    this.state as IMonthAndYear
    this.state = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }
  }

  handleClick(e: any): void {
    e.target as any // FIX ME: TYPE 변경
    let year, month
    if (e.target.className === 'left-arrow') {
      year = this.state.month === 1 ? this.state.year - 1 : this.state.year
      month = this.state.month === 1 ? 12 : this.state.month - 1
    } else if (e.target.className === 'right-arrow') {
      year = this.state.month === 12 ? this.state.year + 1 : this.state.year
      month = this.state.month === 12 ? 1 : this.state.month + 1
    }
    this.setState({
      month,
      year,
    })
  }

  template() {
    return `
      <header class='header'></header>
      <div class='main-container'></div>
    `
  }

  appendChildren() {
    const headerTarget: HTMLElement = this.$target.querySelector('.header')!
    const headerProps = {
      ...this.state,
      handleClick: this.handleClick,
    }
    const mainContainerProps = {
      ...this.state,
    }
    const mainContainerTarget: HTMLElement =
      this.$target.querySelector('.main-container')!
    new Header(headerTarget, headerProps)
    new MainContainer(mainContainerTarget, mainContainerProps)
  }
}
