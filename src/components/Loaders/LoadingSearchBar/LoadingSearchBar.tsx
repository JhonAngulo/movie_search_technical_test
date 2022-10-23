import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingSearchBar = (): JSX.Element => {
  return (
    <SkeletonTheme baseColor="#bbbbc0" highlightColor="#a498d9" duration={3}>
      <div className="loading_search_bar__container">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="loading_search_bar__card" key={item}>
            <Skeleton className="loading_search_bar__card--image" />
            <div className="loading_search_bar__card--info">
              <Skeleton className="loading_search_bar__card--title" />
              <Skeleton className="loading_search_bar__card--rating" />
              <Skeleton className="loading_search_bar__card--summary" />
              <div className="loading_search_bar__card--chip">
                <Skeleton />
                <Skeleton />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  )
}

export default LoadingSearchBar
