import React, { Component } from 'react'
import Typist from 'react-typist'
import DynamicFont from 'react-dynamic-font'

import SubmitButtonIcon from '../Icons/SubmitButtonIcon'


export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      valueLength: 0,
      maxLength: 140,
      isValidCount: true
    }

    this.inputOnChangeHandler               =       this.inputOnChangeHandler.bind(this)
    this.onPostSubmitHandler                =       this.onPostSubmitHandler.bind(this)
  }

  inputOnChangeHandler(e) {
    const{ maxLength } = this.state
    const isValidHandler = () => e.target.value.length !== maxLength ? true : false
    this.setState({ value: e.target.value, valueLength: e.target.value.length, isValidCount: isValidHandler() })
  }

  onPostSubmitHandler() {
    const{ value, valueLength } = this.state
    const{ CreatePost, Settings } = this.props

    if(valueLength !== 0) {
      const newPost = async () => {
        try {
          await CreatePost({ user: Settings.activeUser, message: value })
        } catch(e) {
          return new Error(e)
        }
      }

    return newPost()
      .then(async() => await this.setState({ value: '', valueLength: 0, isValidCount: true }))
      .catch(async(e) => await new Error(e))
    }
  }

  render() {
    const{ value, valueLength, maxLength, isValidCount } = this.state
    const{ CreatePost } = this.props

    const inputDefaultConfig = {
      value: value,
      maxLength: maxLength,
      placeholder: "Hey buddy! Start typin' a classy message here"
    }

    const cursorSettings = {
      show: false,
      blink: true,
      element: '|',
      hideWhenDone: false,
      hideWhenDoneDelay: 850,
    }

    const demoTypingDoneFunc = () => {
      console.log('DONE TYPING!!!')
    }

    const customCarrot = () => {
      return '<div className="carrot">|</div>'
    }

    // console.log(this.state)

    return (
      <div className="createPost__wrapper">
        {/* <Typist
          className="animatedPlaceholder"
          avgTypingSpeed={ 75 }
          stdTypingDelay={ 45 }
          startDelay={ 1800 }
          cursor={ cursorSettings }
          onTypingDone={ demoTypingDoneFunc }>
            As you're typing, observe how beautifullllllllllllllly individual letters resize automagically relative to container size AND the letter count cap limit ;)
          <Typist.Backspace count={ 500 } delay={ 1800 } />
        </Typist> */}
        <div className={ (()=>isValidCount ? 'createPost__input__wrapper--valid' : 'createPost__input__wrapper--invalid')() }>
          <div className="createPost__characterCounter__wrapper">
            <div className="createPost__characterCounter">
              { (()=>isValidCount ? <h4 style={{ color: '#00C397' }}>{ valueLength }</h4> : <h4 style={{ color: '#FF6F6C' }}>{ valueLength }</h4>)() }
            </div>
          </div>
          <div className="createPost__userInput__wrapper" style={{ maxWidth: '549px' }}>
            <form className="createPost__userInput" style={{ maxWidth: '549px'}}>
              <textarea className="userInput"
                        style={{ opacity: 0, position: 'absolute', left: 0, right: 0, bottom: 0 }}
                        value={ inputDefaultConfig.value }
                        maxLength={ inputDefaultConfig.maxLength }
                        placeholder={ inputDefaultConfig.placeholder }
                        onChange={ this.inputOnChangeHandler }>
              </textarea>
              <DynamicFont smooth content={ value } />
            </form>
          </div>
          <div className="createPost__submitButton__wrapper">
            <div className={ (()=>isValidCount ? 'createPost__submitButton--valid' : 'createPost__submitButton--invalid')() }
                 onClick={ ()=>isValidCount ? this.onPostSubmitHandler() : console.log('MESSAGE LENGTH LIMIT EXCEEDED') }>
              <SubmitButtonIcon />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
