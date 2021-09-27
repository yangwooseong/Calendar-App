import './index.scss'
import Component from './_core/Component'
import MainPage from './_components/MainPage'

class App extends Component {
  constructor($target: HTMLElement) {
    super($target)
  }
  template() {
    return `<div class='main-page'></div>`
  }
  appendChildren() {
    const mainPageTarget: HTMLElement =
      this.$target.querySelector('.main-page')!
    new MainPage(mainPageTarget)
  }
}

export default App
