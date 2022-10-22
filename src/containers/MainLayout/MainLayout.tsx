import MovieCard from '@components/MovieCard'
import SearchBar from '@components/SearchBar'

const MainLayout = (): JSX.Element => {
  return (
    <>
      <h1>MainLayout</h1>
      <SearchBar />
      <MovieCard />
    </>
  )
}

export default MainLayout
