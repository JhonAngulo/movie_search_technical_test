import Chip from '@components/Chip'
import { Show } from 'src/models/dataModel'
import no_image from '@assets/no_image.png'

interface ShowCardProps {
  show: Show
}

const ShowCard = ({ show }: ShowCardProps): JSX.Element => {
  const handleSumaryHtml = (summary: string): { __html: string } => {
    if (summary === null) {
      return { __html: 'Without description' }
    }

    if (!summary.includes('<p>')) {
      summary = `<p>${summary}`
    }
    const firstParagraph = summary.split('</p><p>')

    return { __html: `${firstParagraph[0]}</p>` }
  }

  return (
    <div className="show_card">
      <figure className="show_card__image_container">
        <img
          className="show_card__image"
          src={show.image !== null ? show.image.medium : no_image}
          alt={`Imagen ${show.name}`}
        />
      </figure>
      <div className="show_card__info">
        <span className="show_card__info--more">
          <a
            href={show.url}
            target="_blank"
            rel="noopener noreferrer"
            className="show_card__info--link"
          >
            +
          </a>
        </span>
        <h3 className="show_card__info--title">{show.name}</h3>
        <h4 className="show_card__info--rating">
          Rating:
          <span>
            {' '}
            {show.rating.average !== null
              ? `${show.rating.average as string} stars`
              : 'No rating'}
          </span>
        </h4>
        <div
          className="show_card__info--summary"
          dangerouslySetInnerHTML={handleSumaryHtml(show.summary)}
        ></div>
        <div className="chip__container">
          {show.genres.map((genre) => (
            <Chip text={genre} key={genre} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowCard
