import styles from './ErrorModal.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
export default class ErrorModal {
  modalWrapper: HTMLDivElement
  msg: string

  constructor($target: HTMLElement, msg: string) {
    const modal: HTMLDivElement = document.createElement('div')
    modal.className = cx('error-modal-wrapper')
    $target.appendChild(modal)

    this.msg = msg
    this.modalWrapper = modal
    this.render()
  }

  template() {
    this.modalWrapper.innerHTML = ''
    const overlay = document.createElement('div')
    overlay.className = cx('overlay')
    this.modalWrapper.appendChild(overlay)

    const modal = document.createElement('section')
    modal.className = cx('modal')
    this.modalWrapper.appendChild(modal)

    const header = document.createElement('header')
    header.className = cx('header')
    header.innerText = '에러'
    modal.appendChild(header)

    const content = document.createElement('section')
    content.className = cx('content')
    if (this.msg === 'invalid time period') {
      content.innerText = '시간을 다시 설정해주세요'
    } else if (this.msg === 'data already exists') {
      content.innerText = '이미 일정이 있습니다'
    }

    modal.appendChild(content)

    const button: HTMLButtonElement = document.createElement('button')
    button.className = cx('button')
    button.innerHTML = '확인'
    button.addEventListener('click', () => {
      this.modalWrapper.remove()
    })
    modal.appendChild(button)
  }

  render() {
    this.template()
  }
}