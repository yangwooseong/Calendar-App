export default class Component {
  $target: HTMLElement
  props: any
  state: any
  constructor($target: HTMLElement, props?: any) {
    this.$target = $target
    this.props = props // $props 할당
    this.setup()
    this.setEvent()
    this.render()
  }
  setup() {}
  appendChildren() {}
  template() {
    return ''
  }
  render() {
    this.$target.innerHTML = this.template()
    this.appendChildren() // render 후에 mounted가 실행 된다.
  }
  setEvent() {}
  setState(newState: any) {
    this.state = { ...this.state, ...newState }
    this.render()
  }
}
