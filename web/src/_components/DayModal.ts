import Contants from './Contants'

export default class DayModal {
  modal: HTMLDivElement
  type: String
  constructor($target: HTMLElement, type: 'Add' | 'Edit') {
    const modal = document.createElement('div')
    modal.className = 'modal-wrapper'
    $target.appendChild(modal)
    this.modal = modal
    this.type = type

    this.render()
  }

  template() {
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
    title.appendChild(input)

    const start = document.createElement('div')
    start.className = 'start'
    content.appendChild(start)
    start.innerHTML = `<div>
    <span>시작 날짜</span>
    <div>11/13/2018</div>
    </div>`
    const startTime = document.createElement('div')
    start.appendChild(startTime)
    startTime.innerHTML = `<span>시작 시간</span>`
    const startScroll = document.createElement('div')
    startScroll.innerText = 'PM10:00'
    startTime.appendChild(startScroll)

    const end = document.createElement('div')
    end.className = 'end'
    end.innerHTML = `<div>
    <span>종료 날짜</span>
    <div>11/13/2018</div>
    </div>`
    const endTime = document.createElement('div')
    end.appendChild(endTime)
    endTime.innerHTML = `<span>종료 시간</span>`
    const endScroll = document.createElement('div')
    endScroll.innerText = 'PM10:00'
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
    async function createPlan() {
      const requestBody = {
        title: 'tmp',
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      }

      try {
        const response = await fetch(
          `${Contants.ENDPOINT}/plans`,
          requestOptions
        )
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          return data
        } else {
          throw await response.json()
        }
      } catch (err) {
        throw err
      }
    }

    const modal = document.querySelector('.modal-wrapper')!
    document.querySelector('.overlay')!.addEventListener('click', (e) => {
      e.target && modal.remove()
    })
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && modal.remove()
    })
    const closeButton = document.querySelector('footer #id0')!
    closeButton.addEventListener('click', () => {
      modal.remove()
    })
    const saveButton = document.querySelector('footer #id1')!
    saveButton.addEventListener('click', () => {
      createPlan()
    })
  }

  render() {
    this.template()
    this.setEvent()
  }
}
