import Nav from './_components/Nav'
import './index.scss'

class App {
  constructor($target: HTMLElement) {
    const nav = new Nav($target)
  }
}

export default App
