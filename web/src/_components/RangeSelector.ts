import Component from '../_core/Component'

export default class RangeSelctor extends Component {
  constructor($target: HTMLElement) {
    super($target)
  }

  template() {
    return `<button class='left-button'>
      월
    </button>
    <button class='right-button'>
      일    
    </button>
    `
  }
}
