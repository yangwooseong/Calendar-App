// https://www.youtube.com/watch?v=MY5KI2XV0HM

export default class TimeDropdown {
  verticalMenu: HTMLUListElement
  handleClick: any

  constructor($target: HTMLElement, handleClick: any) {
    const verticalMenu = document.createElement('ul')
    verticalMenu.className = 'vertical-menu'
    $target.appendChild(verticalMenu)
    this.verticalMenu = verticalMenu
    this.handleClick = handleClick

    this.render()
  }
  template() {
    const timeArr = []
    for (let i = 0; i < 12; i++) {
      const time = ('0' + i.toString()).slice(-2)
      timeArr.push(`AM ${time}:00`)
    }
    for (let i = 12; i > 0; i--) {
      const time = ('0' + i.toString()).slice(-2)
      timeArr.push(`PM ${time}:00`)
    }
    timeArr.forEach((time) => {
      const timeLiTag = document.createElement('li')
      timeLiTag.innerText = time
      this.verticalMenu.appendChild(timeLiTag)
    })
  }

  setEvent() {
    const modalWrapper = document.querySelector('.modal-wrapper')!
    const liTags = Array.from(
      this.verticalMenu.querySelectorAll('li')
    ) as Array<HTMLLIElement>
    liTags.forEach((li: HTMLLIElement, idx) => {
      li.addEventListener('click', this.handleClick)
    })
  }

  render() {
    this.template()
    this.setEvent()
  }
}
