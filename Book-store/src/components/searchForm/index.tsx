import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { IoIosSearch } from 'react-icons/io'

export function SearchForm () {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleChangeSearch (event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleSubmit (event: FormEvent) {
    event.preventDefault()
    if (search === '') {
      return alert('Заполните поле поиска')
    }
    navigate(`/books/search/${search}/page/1`)
    setSearch('')
  }

  return (
    <form className="navbar__search-form" onSubmit={handleSubmit} role="search">
      <input type="search" id="search-form__input" placeholder="Book name" onChange={handleChangeSearch} value={search} />
      <button type="submit" className="search-form__button" ><IoIosSearch className="search-form__icon" /></button>
    </form>
  )
}
