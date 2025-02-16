import './index.css'
import {Component} from 'react'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import BookStatus from '../BookStatus'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    searchInput: '',
    booksData: [],
    shelf: bookshelvesList[0].value,
    label: bookshelvesList[0].label,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, shelf} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedBooksData = data.books.map(each => ({
        id: each.id,
        title: each.title,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        rating: each.rating,
        readStatus: each.read_status,
      }))

      this.setState({
        booksData: updatedBooksData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getBooksData()
  }

  onClickFilterBooks = value => {
    this.setState({shelf: value}, this.getBooksData)
  }

  onClickLabel = value => {
    this.setState({label: value}, this.getBooksData)
  }

  failureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/student7/image/upload/v1735955098/Group_7522_ofuhzp.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>

      <button type="button" onClick={this.getBooksData}>
        Try Again
      </button>
    </div>
  )

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooks = () => {
    const {searchInput, booksData} = this.state
    const isbooksDataShown = booksData.length > 0
    return (
      <ul className="books-ul">
        {isbooksDataShown ? (
          booksData.map(each => (
            <Link to={`/books/${each.id}`} className="link">
              <li className="book-item" key={each.id}>
                <div className="book-container">
                  <img
                    src={each.coverPic}
                    alt={each.title}
                    className="cover-pic"
                  />
                  <div className="text-container">
                    <h1 className="book-title">{each.title}</h1>
                    <p className="author-name">{each.authorName}</p>
                    <p className="rating">
                      Avg rating <BsFillStarFill /> {each.rating}
                    </p>
                    <p className="status">
                      Status:
                      <span className="book-status">{each.readStatus}</span>
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <div className="failure-view">
            <img
              src="https://res.cloudinary.com/student7/image/upload/v1735955249/Asset_1_1_jop0qo.png"
              alt="no books"
            />
            <p className="para">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )}
      </ul>
    )
  }

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooks()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, shelf, label} = this.state

    return (
      <div>
        <Header />
        <div className="bookshelves-bg">
          <div className="label-search-container">
            <h1 className="status-title">{label} Books</h1>
            <div className="mob-search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                testid="searchButton"
                type="button"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          <div className="d-c">
            <div className="mobile-content">
              <h1>Bookshelves</h1>
              <ul className="labels-container">
                {bookshelvesList.map(each => (
                  <BookStatus
                    onClickFilterBooks={this.onClickFilterBooks}
                    onClickLabel={this.onClickLabel}
                    bookshelves={each}
                    isActive={shelf === each.value}
                  />
                ))}
              </ul>
            </div>

            <div className="desktop-content">
              <h1>Bookshelves</h1>
              <ul className="labels-container">
                {bookshelvesList.map(each => (
                  <BookStatus
                    onClickFilterBooks={this.onClickFilterBooks}
                    onClickLabel={this.onClickLabel}
                    bookshelves={each}
                  />
                ))}
              </ul>
            </div>

            <div>{this.renderAll()}</div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Bookshelves
