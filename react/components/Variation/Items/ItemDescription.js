import '../../../global.css'
export default function ItemDescription({ description, name, imageUrl }) {
  return (
    <div className="flex">
      <div>
        {imageUrl && <img src={imageUrl} className="br3 mr4" style={{ height: '54px', width: '54px' }} />}
      </div>
      <div className="multiple-choice__title flex flex-column justify-center">
        <div className="multiple-choice__name t-heading-5 c-on-base">{name}</div>
        <div className="single-choice__description">{description || null}</div>
      </div>
    </div>
  )
}