import ShowCard from '@components/ShowCard'
import SearchBar from '@components/SearchBar'
import { useRef, useState } from 'react'
import { DataShowObject } from 'src/models/dataModel'
import LoadingSearchBar from '@components/Loaders/LoadingSearchBar'

const BaseUrl = 'https://api.tvmaze.com/search'

const MainLayout = (): JSX.Element => {
  const searchInputRef = useRef('')
  const [data, setData] = useState([])
  const [searchStatus, setSearchStatus] = useState<
    'idle' | 'loading' | 'succeced' | 'error'
  >('idle')

  const fetchData = async (): Promise<void> => {
    const response = await fetch(`${BaseUrl}/shows?q=${searchInputRef.current}`)
    const newData = await response.json()
    setData(newData)
    setSearchStatus('succeced')
  }

  const handleSetLoading = (): void => {
    setSearchStatus('loading')
  }

  const handleSearch = (searchInput: string): void => {
    searchInputRef.current = searchInput
    if (searchInput.length > 0) {
      fetchData().catch(() => console.error('fetchData error'))
    } else {
      setSearchStatus('idle')
      setData([])
    }
  }

  return (
    <>
      <div className="main_layout">
        <h1 className="main_layout__title">THE MOVIE SEARCH APP</h1>
        <SearchBar
          handleSearch={handleSearch}
          handleSetLoading={handleSetLoading}
        />

        {searchStatus === 'loading' && <LoadingSearchBar />}

        {searchStatus === 'succeced' && data.length === 0 ? (
          <h2 className="main_layout__subtitle">
            {`Sorry there is no data for the search "${searchInputRef.current}"`}
          </h2>
        ) : (
          searchStatus !== 'loading' &&
          searchStatus !== 'idle' && (
            <h2 className="main_layout__subtitle">{`${data.length} results for "${searchInputRef.current}"`}</h2>
          )
        )}

        <div className="show_card__container">
          {searchStatus === 'succeced' &&
            data.map((dataShow: DataShowObject) => (
              <ShowCard key={dataShow.show.id} show={dataShow.show} />
            ))}
        </div>
        <br />
        <br />
      </div>
      <footer className="footer">
        <p className="footer__text">
          {`© Todos los derechos reservados - THE MOVIE SEARCH APP | ${new Date().getFullYear()}`}
        </p>
      </footer>
    </>
  )
}

export default MainLayout
