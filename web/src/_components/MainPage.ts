import Header from './Header'
import MainContainer from './MainContainer'

export default class MainPage {
  constructor($target: HTMLElement) {
    const mainPage = document.createElement('div')
    $target.appendChild(mainPage)
    mainPage.className = 'main-page'

    const nav = new Header(mainPage)
    const mainContainer = new MainContainer(mainPage)
  }
}
