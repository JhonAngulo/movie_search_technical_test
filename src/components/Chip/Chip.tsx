interface ChipProps {
  text: string
}

const Chip = ({ text }: ChipProps): JSX.Element => {
  return <span className="chip">{text}</span>
}

export default Chip
