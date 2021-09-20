import './index.scss'
import MainPage from './_components/MainPage'

class App {
  constructor($target: HTMLElement) {
    const mainPage = new MainPage($target)
  }
}

export default App
