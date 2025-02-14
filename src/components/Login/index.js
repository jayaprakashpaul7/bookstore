import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css' // Assuming the CSS provided is saved in a file named styles.css
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', error: '', showErrorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = data => {
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = data => {
    this.setState({error: data.error_msg, showErrorMsg: true})
  }

  handleLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = `https://apis.ccbp.in/login`
    const user = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data)
    } else {
      this.onFailure(data)
    }
  }

  render() {
    const {username, password, error, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="mobile-c">
          <img
            src="https://res.cloudinary.com/student7/image/upload/v1729157256/Rectangle_1467_aajojd.png"
            alt="website login"
            className="login-img"
          />
        </div>

        <div className="desktop-c">
          <img
            src="https://res.cloudinary.com/student7/image/upload/v1729157304/Rectangle_1467_e9pple.png"
            alt="Login Desktop"
            className="login-desktop-img"
          />
        </div>

        <form className="form" onSubmit={this.handleLogin}>
          <img
            src="https://res.cloudinary.com/student7/image/upload/v1729157205/Group_7732_cdkppt.png"
            alt="login website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label htmlFor="text">Username*</label>
            <input
              type="text"
              id="text"
              className="form-input"
              placeholder="Enter your Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="error">{showErrorMsg ? error : ''}</p>
        </form>
      </div>
    )
  }
}

export default Login
