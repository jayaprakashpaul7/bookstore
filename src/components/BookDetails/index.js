import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookdetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok) {
      const bookDetails = data.book_details
      const updatedData = {
        aboutAuthor: bookDetails.about_author,
        aboutBook: bookDetails.about_book,
        authorName: bookDetails.author_name,
        coverPic: bookDetails.cover_pic,
        id: bookDetails.id,
        rating: bookDetails.rating,
        readStatus: bookDetails.read_status,
        title: bookDetails.title,
      }
      this.setState({
        bookdetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBookDetails = () => {
    const {bookdetails} = this.state
    return (
      <div className="book-details-bg">
        <div className="details-card">
          <div className="img-and-text-container">
            <img
              src={bookdetails.coverPic}
              className="book-details-img"
              alt={bookdetails.title}
            />
            <div className="text-container">
              <h1 className="details-title">{bookdetails.title}</h1>
              <p>{bookdetails.authorName}</p>
              <p>
                Avg Rating: <BsFillStarFill />
                {bookdetails.rating}
              </p>
              <p className="status fonts">
                Status:
                <span className="status-span">{bookdetails.readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="line" />
          <div className="about-container">
            <h1 className="about-head fonts">About Author</h1>
            <p className="about-para fonts">{bookdetails.aboutAuthor} </p>
            <h1 className="about-head fonts">About Book</h1>
            <p className="about-para fonts">{bookdetails.aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  failureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getBookDetails}>
        Try Again
      </button>
    </div>
  )

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetails()
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
      <div>
        <Header />
        {this.renderAll()}
      </div>
    )
  }
}
export default BookDetails
