import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Notfound from './components/NotFound'

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

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/shelf"
      bookshelvesList={bookshelvesList}
      component={Bookshelves}
    />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route path="/not-found" component={Notfound} />
  </Switch>
)

export default App
