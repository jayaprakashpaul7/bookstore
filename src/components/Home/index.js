import {Link} from 'react-router-dom'
import ReactSlider from '../ReactSlider'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

const Home = () => (
  <div>
    <Header />
    <div className="home-bg">
      <div className="home-text-container">
        <h1 className="title">Find Your Next Favorite Books?</h1>
        <p className="description">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <Link className="hm-link" to="/shelf">
          <button className="find-book-btn" type="button">
            Find Books
          </button>
        </Link>
      </div>

      <ReactSlider />

      <Footer />
    </div>
  </div>
)

export default Home
