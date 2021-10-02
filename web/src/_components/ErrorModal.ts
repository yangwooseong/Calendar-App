import Component from '../_core/Component'

export default class ErrorModal extends Component {
  msg: string

  constructor($target: HTMLElement, msg: string) {
    super($target, msg)

    this.msg = msg
  }

  appendChildren() {
    this.$target.innerHTML = ''
    const overlay = document.createElement('div')
    overlay.className = 'overlay'
    this.$target.appendChild(overlay)

    const modal = document.createElement('section')
    modal.className = 'modal'
    this.$target.appendChild(modal)

    const header = document.createElement('header')
    header.className = 'header'
    header.innerText = '에러'
    modal.appendChild(header)

    const content = document.createElement('section')
    content.className = 'content'
    if (this.msg === 'invalid time period') {
      content.innerText = '시간을 다시 설정해주세요'
    } else if (this.msg === 'data already exists') {
      content.innerText = '이미 일정이 있습니다'
    }

    modal.appendChild(content)

    const button: HTMLButtonElement = document.createElement('button')
    button.className = 'ok-button'
    button.innerHTML = '확인'
    modal.appendChild(button)
  }

  setEvent() {
    console.log(this.$target)

    const modalWrapperTarget = document.querySelector('.modal-wrapper')
    this.$target.addEventListener('click', (e: any) => {
      console.log(e.target.className)
      if (e.target.className.contains('ok-button')) {
        this.$target.innerHTML = ''
      }
    })
  }
}
