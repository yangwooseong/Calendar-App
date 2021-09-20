import Header from './Header'
import MainContainer from './MainContainer'
import styles from './MainPage.module.scss'
import classNames from 'classnames/bind'

export default class MainPage {
  constructor($target: HTMLElement) {
    const mainPage = document.createElement('div')
    $target.appendChild(mainPage)
    const cx = classNames.bind(styles)
    mainPage.className = cx('main-page')

    const nav = new Header(mainPage)
    const mainContainer = new MainContainer(mainPage)
  }
}
