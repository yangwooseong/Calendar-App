import Component from '../_core/Component'

export default class OneDay extends Component {
  constructor($target: HTMLElement, props: string) {
    super($target, props)
  }

  appendChildren() {
    const dateTime = this.props
    this.$target.innerText = dateTime.slice(-2).startsWith('0')
      ? dateTime.slice(-1)
      : dateTime.slice(-2)
  }
}
