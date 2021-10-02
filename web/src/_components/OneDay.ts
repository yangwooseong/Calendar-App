import Component from '../_core/Component'

export default class OneDay extends Component {
  constructor($target: HTMLElement, props: any) {
    super($target, props)
  }

  appendChildren() {
    const { dateTime } = this.props
    this.$target.innerHTML = `<span>
    ${
      dateTime.slice(-2).startsWith('0')
        ? dateTime.slice(-1)
        : dateTime.slice(-2)
    }
    </span>`

    console.log(this.props.plans)
    if (!this.props.plans) return

    let displayPlans: Array<number> = []
    let start: number
    this.props.plans.map((val: any, idx: number) => {
      if (idx === 0) {
        start = val.time
        displayPlans.push(val)
        return
      } else {
        if (val.time - start === 1) {
          start = val.time
          return
        } else {
          start = val.time
          displayPlans.push(val)
        }
      }
    })

    displayPlans.map((val: any) => {
      const span = document.createElement('li')
      span.className = `plan-${val.time}`
      span.innerHTML = `
        <span>${val.time}시 - ${val.title}</span>
      `
      this.$target.appendChild(span)
    })
  }
}
