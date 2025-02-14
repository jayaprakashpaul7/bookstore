import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {
  state = {isMenuOpen: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickMenu = () => {
    this.setState(prev => ({isMenuOpen: !prev.isMenuOpen}))
  }

  render() {
    const {isMenuOpen} = this.state
    return (
      <nav className="navbar-header">
        <div className="content-mobile">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/student7/image/upload/v1729157205/Group_7732_cdkppt.png"
              alt="website logo"
              className="logo"
            />
          </Link>
          <button
            className="nav-btn"
            type="button"
            aria-expanded={isMenuOpen}
            aria-label="Toggle Menu"
            onClick={this.onClickMenu}
          >
            <img
              src="https://res.cloudinary.com/student7/image/upload/v1729158353/menu_wfwcri.png"
              alt="menu"
            />
          </button>
        </div>

        <div className="h-flex">
          {isMenuOpen && (
            <ul className="navbar-ul h-link">
              <Link to="/" className="h-link">
                <li className="navbar-li">Home</li>
              </Link>
              <Link to="/shelf" className="h-link">
                <li className="navbar-li">Bookshelves</li>
              </Link>
              <li className="navbar-li">
                <button
                  className="logout-btn"
                  type="button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
              <li>
                <img
                  src="https://res.cloudinary.com/student7/image/upload/v1737454792/Solid_pq4r4a.png"
                  alt="close"
                  onClick={this.onClickMenu}
                />
              </li>
            </ul>
          )}
        </div>

        <div className="content-desktop">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/student7/image/upload/v1729157205/Group_7732_cdkppt.png"
              alt="website logo"
              className="logo"
            />
          </Link>

          <ul className="navbar-ul">
            <Link to="/" className="h-link">
              <li className="navbar-li">Home</li>
            </Link>
            <Link to="/shelf" className="h-link">
              <li className="navbar-li">Bookshelves</li>
            </Link>
            <li className="navbar-li">
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
