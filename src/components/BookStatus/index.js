import './index.css'

const BookStatus = props => {
  const {bookshelves, onClickFilterBooks, onClickLabel, isActive} = props
  const {id, value, label} = bookshelves

  const filter = values => {
    onClickFilterBooks(values)
  }

  const labelBtn = labels => {
    onClickLabel(labels)
  }

  const activeBtnColor = isActive ? 'read-status-btn' : 'read-btn'

  return (
    <li className="label-item" key={id}>
      <button
        type="button"
        onClick={() => {
          filter(value)
          labelBtn(label)
        }}
        className={`${activeBtnColor} btn`}
      >
        {label}
      </button>
    </li>
  )
}
export default BookStatus
