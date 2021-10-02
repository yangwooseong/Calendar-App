// https://www.youtube.com/watch?v=MY5KI2XV0HM

import Component from '../_core/Component'

export default class TimeDropdown extends Component {
  handleClick: any

  constructor($target: HTMLElement, handleClick: any) {
    super($target, handleClick)

    this.handleClick = handleClick

    this.render()
  }

  template() {
    const verticalMenu = document.createElement('ul')
    verticalMenu.className = 'vertical-menu'
    return `<ul class='vertical-menu'></ul>`
  }

  appendChildren() {
    const timeArr = []
    for (let i = 0; i < 12; i++) {
      const time = ('0' + i.toString()).slice(-2)
      timeArr.push(`AM ${time}:00`)
    }
    for (let i = 0; i <= 12; i++) {
      const time = ('0' + i.toString()).slice(-2)
      timeArr.push(`PM ${time}:00`)
    }
    timeArr.forEach((time) => {
      const timeLiTag = document.createElement('li')
      timeLiTag.className = 'li'
      timeLiTag.innerText = time
      this.$target.querySelector('.vertical-menu')?.appendChild(timeLiTag)
    })
  }

  setEvent() {
    this.$target.addEventListener('click', (e: any) => {
      if (e.target.classList.contains('li')) {
        this.handleClick(e)
      }
    })
  }
}
