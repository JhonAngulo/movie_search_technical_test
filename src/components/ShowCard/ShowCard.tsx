import { Show } from 'src/models/dataModel'
import no_image from '@assets/no_image.png'

interface ShowCardProps {
  show: Show
}

const ShowCard = ({ show }: ShowCardProps): JSX.Element => {
  console.log(show.image)

  const handleSumaryHtml = (summary: string): { __html: string } => {
    if (summary === null) {
      return { __html: 'Without description' }
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
      </div>
    </div>
  )
}

export default ShowCard