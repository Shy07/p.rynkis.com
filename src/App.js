import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      poetry: null
    }
  }

  scrollToRight () {
    let content = window.$(ReactDOM.findDOMNode(this.refs.content))
    setTimeout(() => { window.scrollTo(content.width(), 0) }, 10)
  }

  openCommit () {
    window.$('.mask').fadeIn()
    window.$('.footer').animate({opacity: 1}, 'fast')
    window.$('.footer').slideDown()
  }

  closeCommit () {
    window.$('.mask').fadeOut()
    window.$('.footer').slideUp()
  }

  start () {
    window.$('body').fadeIn(800)
    this.scrollToRight()
    window.$('.switch').on('click', this.openCommit)
    window.$('.mask').on('click', this.closeCommit)
    window.$('.close-commit').on('click', this.closeCommit)
  }

  componentDidMount () {
    window.$.ajax({
      headers: {
        'x-access-token': 'p.rynki.com'
      },
      // url: 'http://localhost:8084/poetry/random',
      url: 'http://cp.rynkis.com/poetry/random',
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: (data) => {
        // console.log(data)
        this.setState({
          poetry: data
        })
      },
      error: (xhr, text, errorThrown) => {
        // window.alert(xhr.readyState)
        console.log(xhr.readyState)
      }
    })
  }

  componentDidUpdate () {
    this.start()
  }

  render () {
    let poetry = this.state.poetry
    let content = null
    if (poetry !== null) {
      let link = document.createElement('link')
      link.rel = 'stylesheet'
      // link.href = `http://poetry.shy07.com/assets/css/${poetry.hash}/SentyTang.css`
      link.type = 'text/css'
      document.head.appendChild(link)
      document.title = `${poetry.title} - ${poetry.author}`
      let commits = null
      if (poetry.commits.length > 0) {
        let commit = poetry.commits.map((c, i) => (<small key={i}>{c}<br /></small>))
        commits = (
          <div>
            <div className='mask' />
            <div className='switch'>
              <span><small>注</small></span>
            </div>
            <div className='footer'>
              <div className='footer-nav'>注释 <span className='close-commit'><small>折叠</small></span></div>
              <p className='commit'>
                {commit}
              </p>
            </div>
          </div>
        )
      }
      content = (
        <div>
          <div ref='content' className='content'>
            <p className='poetry'>{poetry.content}</p>
            <div className='title'>{poetry.title}
              <div className='author'>{poetry.author}<span>賦</span></div>
            </div>
          </div>
          {commits}
        </div>
      )
    }
    return content
  }
}

export default App
