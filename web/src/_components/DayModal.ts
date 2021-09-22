import api from './api'
import Contants from './Contants'
import { modalState } from '../_interfaces/modalState'
import TimeDropdown from './TimeDropdown'

export default class DayModal {
  modal: HTMLDivElement
  type: String
  state: modalState

  constructor($target: HTMLElement, type: 'Add' | 'Edit') {
    const modal = document.createElement('div')
    modal.className = 'modal-wrapper'
    $target.appendChild(modal)
    this.modal = modal
    this.type = type
    this.state = {
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    }

    this.handleClick = this.handleClick.bind(this)
    this.render()
  }

  template() {
    this.modal.innerHTML = ''

    const overlay = document.createElement('div')
    overlay.className = 'overlay'
    this.modal.appendChild(overlay)

    const modal = document.createElement('section')
    modal.className = 'modal'
    this.modal.appendChild(modal)

    const header = document.createElement('header')
    header.className = 'modal-header'
    header.innerText = '일정 만들기'
    modal.appendChild(header)

    const content = document.createElement('section')
    content.className = 'modal-content'

    const title = document.createElement('div')
    title.className = 'title'
    content.appendChild(title)
    const info = document.createElement('span')
    info.innerText = '일정 제목을 입력하세요'
    title.appendChild(info)
    const input = document.createElement('input')
    input.value = this.state.title
    title.appendChild(input)

    const start = document.createElement('div')
    start.className = 'start'
    content.appendChild(start)
    start.innerHTML = `<div>
    <span>시작 날짜</span>
    <div>11/13/2018</div>
    </div>`
    const startTime = document.createElement('div')
    startTime.className = 'start-time'
    start.appendChild(startTime)
    startTime.innerHTML = `<span>시작 시간</span>`
    const startScroll = document.createElement('div')
    startScroll.innerText = this.state.startTime || 'PM12:00'
    startTime.appendChild(startScroll)

    const end = document.createElement('div')
    end.className = 'end'
    end.innerHTML = `<div>
    <span>종료 날짜</span>
    <div>11/13/2018</div>
    </div>`
    const endTime = document.createElement('div')
    endTime.className = 'end-time'
    end.appendChild(endTime)
    endTime.innerHTML = `<span>종료 시간</span>`
    const endScroll = document.createElement('div')
    endScroll.innerText = this.state.endTime || 'PM02:00'
    endTime.appendChild(endScroll)

    content.appendChild(end)

    modal.appendChild(content)

    const footer = document.createElement('footer')
    modal.appendChild(footer)
    const stringArr = ['닫기', '저장', '수정']
    const num = this.type === 'Add' ? 2 : 3
    for (let i = 0; i < num; i++) {
      const button = document.createElement('button')
      button.innerText = stringArr[i]
      button.id = 'id' + i.toString()
      footer.appendChild(button)
    }
  }

  setEvent() {
    const modalWrapper = document.querySelector('.modal-wrapper')!
    const overlay = document.querySelector('.overlay')!
    const modal = document.querySelector('.modal')!

    modalWrapper.addEventListener('click', (e: any) => {
      const verticalMenu = document.querySelector('.vertical-menu')
      if (e.target.className === 'overlay') {
        verticalMenu ? verticalMenu.remove() : modalWrapper.remove()
      }
    })

    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && modalWrapper.remove()
    })
    const closeButton = document.querySelector('footer #id0')!
    closeButton.addEventListener('click', () => {
      modalWrapper.remove()
    })
    const saveButton = document.querySelector('footer #id1')!
    saveButton.addEventListener('click', async () => {
      const requestBody = {
        title: this.state.title,
        startDate: 'tmp',
        startTime: 'tmp',
        endDate: 'tmp',
        endTime: 'tmp',
      }
      await api.createPlan(requestBody)
      modalWrapper.remove()
    })
    modalWrapper.querySelector('input')!.addEventListener('keyup', (e) => {
      this.setState({ title: modalWrapper.querySelector('input')!.value })
    })
    modalWrapper.querySelector('.start-time')!.addEventListener('click', () => {
      !modalWrapper.querySelector('.vertical-menu') &&
        new TimeDropdown(
          modalWrapper.querySelector('.start-time')!,
          this.handleClick
        )
    })
    modalWrapper.querySelector('.end-time')!.addEventListener('click', () => {
      !modalWrapper.querySelector('.vertical-menu') &&
        new TimeDropdown(
          modalWrapper.querySelector('.end-time')!,
          this.handleClick
        )
    })
  }

  handleClick(e: any) {
    const modalWrapper = document.querySelector('.modal-wrapper')!
    modalWrapper.querySelector('.start-time .vertical-menu')
      ? this.setState({ startTime: e.target.innerText })
      : this.setState({ endTime: e.target.innerText })
    modalWrapper.querySelector('.vertial-menu')?.remove()
    e.stopPropagation()
  }

  setState(newState: object) {
    this.state = { ...this.state, ...newState }
    this.render()
    if (newState.hasOwnProperty('title')) {
      this.modal.querySelector('input')?.focus()
    }
  }

  render() {
    this.template()
    this.setEvent()
  }
}
