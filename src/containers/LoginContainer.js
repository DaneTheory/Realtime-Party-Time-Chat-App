/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Radio from 'material-ui/Radio';
import Button from 'material-ui/Button'


class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      realName: '',
      realNameShrink: false,
      username: '',
      userNameShrink: false,
      autoVerify: true,
    }

    this.userloginHandler     =     this.userloginHandler.bind(this)
    this.userSignupHandler    =     this.userSignupHandler.bind(this)
    this.handleFullNameChange   =   this.handleFullNameChange.bind(this)
    this.handleUserNameChange     =     this.handleUserNameChange.bind(this)
    this.handleChange    =   this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ autoVerify: e.target.value })
  }

  handleUserNameChange(e) {
    this.setState({ username: e.target.value })
  }

  handleFullNameChange(e) {
    this.setState({ realName: e.target.value })
  }

  userSignupHandler() {
    const{ Users, Signup } = this.props

    const newUserSignUp = async () => {
      try {
        await Signup({
              currUsersArr: Object.keys(Users).map(user => Users[user]),
              ...this.state
            })

      } catch(e) {
        return new Error(e)
      }

    }
  return newUserSignUp()
    .then(() => this.setState({ realName: '', username: '' }))
    .catch(e => new Error(e))
  }

  userloginHandler() {
    const{ Login, Settings } = this.props
    Login(!Settings.isLoggedIn)
  }

  render() {
    const { Users, Settings, Signup } = this.props
    const styles = theme => ({
      container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing.unit,
          marginRight: theme.spacing.unit,
          width: 200,
        },
        menu: {
          width: 200,
        },
        button: {
          margin: theme.spacing.unit,
        },
      })

    return (
      <form className={ styles.container } noValidate autoComplete="off">

        {
          (()=> Settings.activeUser === null ?
            <div>
              <TextField
                label="Real Name"
                placeholder="What's your first and last name?"
                required
                fullWidth
                margin="dense"
                onChange={ this.handleFullNameChange }
                value={ this.state.realName }
              />
              <TextField
                label="Username"
                placeholder="What username would you like?"
                required
                fullWidth
                margin="dense"
                onChange={ this.handleUserNameChange }
                value={ this.state.username }
              />
              <div style={{ display: 'flex' }}>
                <span style={{ display: 'inline-flex' }}>
                  <Radio
                    onClick={ (e)=> this.state.autoVerify ? this.setState({ autoVerify: false }) : this.setState({ autoVerify: true }) }
                    checked={ this.state.autoVerify }
                    onChange={ this.handleChange }
                    value={ this.state.autoVerify }
                  />
                </span>
                <span style={{ display: 'inline-flex' }}>
                  <p>Auto Verify Account?</p>
                </span>
              </div>
            </div>
            :
            <div>
              {
                (()=>
                  Object.keys(Users)
                    .filter(user => Users[user] === Users[Settings.activeUser])
                    .map(loggedInUser => {
                      return (
                        <div style={{ display: 'grid', 'justifyContent': 'space-around' }}>
                          <div>
                            <h2 style={{ display: 'flex' }}>
                              Hi, <span style={{ color: '#00C397' }}>{ Users[loggedInUser].real_name }</span>
                                <div style={{ display: 'inline-flex', margin: 'auto 0', marginLeft: 'auto', color: '#00C397', 'borderBottom': '2px solid black', marginBottom: 0, marginRight: '0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>
                                  { Object.keys(Users).map(user => Users[user]).length }
                                </div>
                                <span style={{ fontWeight: 100, display: 'flex', margin: 'auto auto', marginLeft: 0, fontSize: '0.8rem' }}>
                                  users are currently online chatting.
                                </span>
                            </h2>
                          </div>
                          <h1 style={{ width: '100%', 'borderBottom': '2px dashed rgb(0, 195, 151)', marginTop: 0, borderTop: '2px dashed rgb(0, 195, 151)', fontSize: '3rem' }}>
                            Welcome To The Party!
                            <span style={{ fontWeight: 100, display: 'flex', marginTop: 0, fontSize: '1rem' }}>Finish logging in by clicking the button below.</span>
                          </h1>
                          <div>
                            <h4 style={{ fontWeight: 500 }}>
                              Users will  recognize you by your username, <span style={{ color: '#00C397' }}>{ Users[loggedInUser].username }.</span>
                            </h4>
                          </div>
                          {
                            (()=> Settings.isRegistered ?
                              <Button raised color="primary" className={styles.button} onClick={ this.userloginHandler }>LOGIN NOW?</Button>
                              :
                              <Button disabled={ true } raised color="primary" className={styles.button}>SIGN UP</Button>
                            )()
                          }
                        </div>
                      )
                    })
                )()
              }
            </div>
        )()
        }
        {
            (()=> this.state.realName && this.state.username !== '' ?
              <Button disabled={ false } raised color="primary" className={styles.button} onClick={ this.userSignupHandler } >SIGN UP</Button>
              :
              !Settings.isRegistered ?
                <Button disabled={ true } raised color="primary" className={styles.button}>SIGN UP</Button>
              :
              null
            )()
        }

      </form>
    )
  }
}

export default LoginContainer
