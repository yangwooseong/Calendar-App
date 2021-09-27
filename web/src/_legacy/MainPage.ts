// import Header from './Header'
// import MainContainer from './MainContainer'

// class MainPage {
//   state: {
//     month: number
//     year: number
//   }
//   $target
//   constructor($target: any) {
//     this.state = {
//       month: new Date().getMonth() + 1,
//       year: new Date().getFullYear(),
//     }
//     this.$target = $target
//     this.handleClick = this.handleClick.bind(this)
//     this.render()
//   }

//   handleClick(e: any): void {
//     e.target as any // FIX ME: TYPE 변경
//     if (e.target.className === 'left-arrow') {
//       const year =
//         this.state.month === 11 ? this.state.year + 1 : this.state.year
//       const month = this.state.month === 11 ? 0 : this.state.month + 1
//       this.setState({
//         month,
//         year,
//       })
//     }
//   }

//   template() {
//     // const mainPage = document.createElement('div')
//     // mainPage.className = 'main-page'
//     return `<div class='main-page'></div>`
//   }

//   setState(newState: object) {
//     this.state = { ...this.state, ...newState }
//     this.render()
//   }

//   render() {
//     this.$target.innerHTML = this.template()

//     const mainPage: HTMLElement = document.querySelector('.main-page')!
//     const nav = new Header(mainPage, this.state, this.handleClick)
//     const mainContainer = new MainContainer(mainPage, this.state)
//   }
// }
