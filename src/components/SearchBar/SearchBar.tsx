import { ChangeEventHandler, useEffect, useRef, useState } from 'react'

interface SearchBarProps {
  handleSearch: (searchInput: string) => void
  handleSetLoading: () => void
}

const SearchBar = ({
  handleSearch,
  handleSetLoading
}: SearchBarProps): JSX.Element => {
  const [search, setSearch] = useState('')
  const searchRef = useRef('')

  const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    let timmer: NodeJS.Timeout

    if (searchRef.current !== search) {
      searchRef.current = search
      handleSetLoading()
      timmer = setTimeout(() => {
        handleSearch(search)
      }, 1000)
    }

    return () => {
      clearTimeout(timmer)
    }
  }, [search])

  return (
    <div className="search_bar">
      <label htmlFor="searchInput" className="search_bar__label">
        Search
      </label>
      <input
        id="searchInput"
        name="searchInput"
        className="search_bar__input"
        type="text"
        value={search}
        onChange={handleChangeSearch}
        placeholder="TV show or movie"
      />
    </div>
  )
}

export default SearchBar
