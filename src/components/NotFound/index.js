import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-container">
    <img
      className="not-found-img"
      alt="not found"
      src="https://res.cloudinary.com/student7/image/upload/v1735189519/Group_7484_1_pquxxb.png"
    />

    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found</p>
    <Link to="/" className="link">
      <button type="button" className="go-back-to-home-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
