import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

/* Add css to your project */
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  adaptiveHeight: false,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlider extends Component {
  state = {favBooksData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getFavBooks()
  }

  getFavBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const {books} = data
      const formatedData = books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        favBooksData: formatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  failureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/student7/image/upload/v1735955098/Group_7522_ofuhzp.png"
        alt="failure view"
        className="failure-view-img"
      />
      <p>Something went wrong. Please try again</p>

      <button
        type="button"
        className="try-again-btn"
        onClick={this.getFavBooks}
      >
        Try Again
      </button>
    </div>
  )

  renderSlider = () => {
    const {favBooksData} = this.state

    return (
      <Slider {...settings} className="slider-container">
        {favBooksData.map(each => {
          const {id, coverPic, title, authorName} = each
          return (
            <Link
              to={`/books/${id}`}
              key={id}
              className="slick-item slider-link"
            >
              <ul style={{paddingLeft: 0}}>
                <li style={{listStyleType: 'none'}}>
                  <img
                    className="slick-item-pic"
                    src={coverPic}
                    alt="company logo"
                  />
                  <h1>{title}</h1>
                  <p>{authorName}</p>
                </li>
              </ul>
            </Link>
          )
        })}
      </Slider>
    )
  }

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSlider()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1>Top rated Books</h1>
        <div>{this.renderAll()}</div>
      </div>
    )
  }
}

export default ReactSlider
