import api from './api'
import TimeDropdown from './TimeDropdown'
import ErrorModal from './ErrorModal'
import Component from '../_core/Component'

export default class DayModal extends Component {
  targetBeforeAddingEventListener
  constructor($target: HTMLElement, props: any) {
    super($target, props)

    this.targetBeforeAddingEventListener = $target
    $target.style.pointerEvents = 'auto'

    // this.handleClick = this.handleClick.bind(this)
    this.render()
  }

  setup() {
    const { type, dateTime } = this.props
    this.state = {
      title: '',
      date: dateTime,
      startTime: 'PM 00:00',
      endTime: 'PM 02:00',
    }
  }

  appendChildren() {
    const modalTarget = this.$target

    const overlay = document.createElement('div')
    overlay.className = 'overlay'
    modalTarget.appendChild(overlay)

    const modal = document.createElement('section')
    modal.className = 'modal'
    modalTarget.appendChild(modal)

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
    startScroll.innerText = this.state.startTime
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
    endScroll.innerText = this.state.endTime
    endTime.appendChild(endScroll)

    content.appendChild(end)

    modal.appendChild(content)

    const footer = document.createElement('footer')
    modal.appendChild(footer)
    const stringArr = ['닫기', '저장', '수정']
    const num = this.props.type === 'Add' ? 2 : 3
    const obj: { [key: string]: string } = {
      0: 'cancel',
      1: 'save',
      2: 'change',
    }
    for (let i = 0; i < num; i++) {
      const button = document.createElement('button')
      button.innerText = stringArr[i]
      button.className = `button-${obj[i.toString()]}`
      footer.appendChild(button)
    }
  }

  setEvent() {
    let target = this.$target
    const once = {
      once: true,
    }
    const nonOnce = {
      once: false,
    }

    // target.addEventListener('click', (e: any) => {
    //   const verticalMenu = document.querySelector('.vertical-menu')
    //   if (e.target.className === 'overlay') {
    //     if (verticalMenu) {
    //       verticalMenu.remove()
    //     } else {
    //       target.innerHTML = ''
    //       target.style.pointerEvents = 'none'
    //     }
    //   }
    // })

    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape') {
          target.innerHTML = ''
          target.style.pointerEvents = 'none'
        }
      },
      once
    )

    function handleCancelClick(e: any) {
      if (e.target.classList.contains('button-cancel')) {
        target.innerHTML = ''
        target.style.pointerEvents = 'none'
      }
    }

    target.addEventListener('click', handleCancelClick, once)

    target.addEventListener(
      'click',
      async (e: any) => {
        if (e.target.classList.contains('button-save')) {
          const requestBody = this.state
          const res = await api.createPlan(requestBody)
          if (res.ok) {
            target.innerHTML = ''
            target.style.pointerEvents = 'none'
          } else {
            console.log('error modal')
            const errorModalTarget: HTMLElement = document.querySelector(
              '.error-modal-wrapper'
            )!
            new ErrorModal(errorModalTarget, res.msg)
            target.addEventListener('click', handleCancelClick, once)
          }
        }
      },
      nonOnce
    )

    // target.querySelector('input')!.addEventListener('keyup', (e) => {
    //   this.setState({ title: target.querySelector('input')!.value })
    // })
    // target.querySelector('.start-time')!.addEventListener('click', () => {
    //   !target.querySelector('.vertical-menu') &&
    //     new TimeDropdown(target.querySelector('.start-time')!, this.handleClick)
    // })
    // target.querySelector('.end-time')!.addEventListener('click', () => {
    //   !target.querySelector('.vertical-menu') &&
    //     new TimeDropdown(target.querySelector('.end-time')!, this.handleClick)
    // })
  }

  // handleClick(e: any) {
  //   const target = document.querySelector('.modal-wrapper')!
  //   target.querySelector('.start-time .vertical-menu')
  //     ? this.setState({ startTime: e.target.innerText })
  //     : this.setState({ endTime: e.target.innerText })
  //   target.querySelector('.vertial-menu')?.remove()
  //   e.stopPropagation()
  // }

  // setState(newState: object) {
  //   this.state = { ...this.state, ...newState }
  //   this.render()
  //   if (newState.hasOwnProperty('title')) {
  //     this.modal.querySelector('input')?.focus()
  //   }
  // }
}
