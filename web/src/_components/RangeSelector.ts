export default class RangeSelctor {
  constructor($target: HTMLElement) {
    const range: HTMLElement = document.createElement('div')
    range.innerText = 'select'
    $target.appendChild(range)
  }
}
