import React from 'react'
import './index.scss'

// export function BookCard (props: React.FC) {
//   return (
//     <div className="book-card">
//       <div className="book-card__image">
//         <img src="../../../images/a637cc2a0ceff46418f07acd54bb227a.jpeg" alt="" />
//       </div>
//       <h3 className="book-card__title">Book title</h3>
//       <span className="book-card__info">{props.children}</span>
//       <div className="book-card__features">
//         <span className="book-card__features__price">31$</span>
//         <span className="book-card__features__rating">5 stars</span>
//       </div>
//     </div>
//   )
// }

interface Props {
  info: string
}

export function BookCard (props: Props) {
  return (
    <div className="book-card">
      <div className="book-card__image">
        <img src="../../../images/a637cc2a0ceff46418f07acd54bb227a.jpeg" alt="" />
      </div>
      <h3 className="book-card__title">Book title</h3>
      <span className="book-card__info">{props.info}</span>
      <div className="book-card__features">
        <span className="book-card__features__price">31$</span>
        <span className="book-card__features__rating">5 stars</span>
      </div>
    </div>
  )
}
