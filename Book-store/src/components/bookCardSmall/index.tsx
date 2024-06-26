import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../types/hooks'
import { toggleFavouriteById } from '../../redux/books-slice'
import { removeBookFromCart } from '../../redux/book-slice'
import { FaRegHeart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import './index.scss'

interface PropsSmall {
  id: string,
  image: string,
  title: string,
  info: string,
  price: string
}

export function BookCardSmall (props: PropsSmall) {
  const dispatch = useAppDispatch()

  const getBooksFromLocalStorage = () => {
    const favouritesBooks = localStorage.getItem('favourites')

    return JSON.parse(favouritesBooks)
  }

  const favouritesBooks = getBooksFromLocalStorage()

  // function handleClickRemoveFromCart () {
  //   dispatch(removeBookFromCart(props.id))
  //   console.log('click')
  // }
  function handleClickRemoveFromCart () {
    dispatch(removeBookFromCart(props.id))
    console.log('click')
  }

  function toggleFavourite () {
    dispatch(toggleFavouriteById(props.id))
  }

  // toogleFavourite должен работать, но почему-то выдаёт крестик всегда вместо сердечка
  function renderIcon () {
    if (props.isFavourite) {
      return <MdFavorite className="book-card-sm__features__favourite" onClick={toggleFavourite}/>
    } else {
      return <span className="book-card-sm__features__close" onClick={handleClickRemoveFromCart}>X</span>
    }
  }

  return (
    <div className="book-card-sm">
      <div className="book-card-sm__image">
        <div className="book-card-sm__icons">
          <FaRegHeart className="book-icon-sm" onClick={toggleFavourite}/>
        </div>
        <img src={props.image} alt="" />
      </div>
      <div className="book-card-sm__info">
        <NavLink className="card-link" to={`/book/${props.id}`}>
          <h3 className="book-card-sm__title">{props.title}</h3>
        </NavLink>
        <span className="book-card-sm__about">{props.info}</span>
        <div className="book-card-sm__counter">
          <span>-</span>
          <span>0</span>
          <span>+</span>
        </div>
      </div>
      <div className="book-card-sm__features">
        <span className="book-card-sm__features__price">{props.price}</span>
        {/* <MdFavorite className="book-card-sm__features__favourite" onClick={toggleFavourite}/> */}
        {renderIcon()}
        {/* <span className="book-card-sm__features__close" onClick={handleClickRemoveFromCart}>X</span> */}
      </div>
    </div>
  )
}

// export function BookCardSmall (props: PropsSmall) {
//   const dispatch = useAppDispatch()

//   function handleClickRemoveFromCart () {
//     dispatch(removeBookFromCart(props.id))
//     console.log('click')
//   }

//   return (
//     <div className="book-card-sm">
//       <div className="book-card-sm__image">
//         <div className="book-card-sm__icons">
//           <FaRegHeart className="book-icon-sm" />
//         </div>
//         <img src={props.image} alt="" />
//       </div>
//       <div className="book-card-sm__info">
//         <NavLink className="card-link" to={`/book/${props.id}`}>
//           <h3 className="book-card-sm__title">{props.title}</h3>
//         </NavLink>
//         <span className="book-card-sm__about">{props.info}</span>
//         <div className="book-card-sm__counter">
//           <span>-</span>
//           <span>0</span>
//           <span>+</span>
//         </div>
//       </div>
//       <div className="book-card-sm__features">
//         <span className="book-card-sm__features__price">{props.price}</span>
//         <span className="book-card-sm__features__close" onClick={handleClickRemoveFromCart}>X</span>
//       </div>
//     </div>
//   )
// }
