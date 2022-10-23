import ShowCard from '@components/ShowCard'
import SearchBar from '@components/SearchBar'
import { useEffect, useRef, useState } from 'react'
import { DataShowObject } from 'src/models/dataModel'

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
    console.log('search data', searchInput)
    searchInputRef.current = searchInput
    if (searchInput.length > 0) {
      fetchData().catch(() => console.log('fetchData error'))
    } else {
      setSearchStatus('idle')
      setData([])
    }
  }

  useEffect(() => {
    // fetchData().catch(() => console.log('fetchData error'))
    console.log('ddd', searchStatus, data.length)
  }, [searchStatus, data])

  return (
    <div className="main_layout">
      <h1 className="main_layout__title">THE MOVIE SEARCH APP</h1>
      <SearchBar
        handleSearch={handleSearch}
        handleSetLoading={handleSetLoading}
      />

      {searchStatus === 'loading' && <h2>Loading</h2>}

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
  )
}

export default MainLayout
