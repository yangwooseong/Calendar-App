import Header from './Header'
import MainContainer from './MainContainer'

export default class MainPage {
  state: {
    month: number
  }
  constructor($target: HTMLElement) {
    const mainPage = document.createElement('div')
    $target.appendChild(mainPage)
    mainPage.className = 'main-page'

    this.state = {
      month: 11,
    }

    const nav = new Header(mainPage)
    const mainContainer = new MainContainer(mainPage, this.state.month)
  }

  setState(newState: object) {
    this.state = { ...this.state, ...newState }
  }
}
