export default function ItemDescription({ description, name, imageUrl }) {
  return (
    <div className="flex-auto flex align-center">
      <div>
        {imageUrl && <img src={imageUrl} width="54" className="br3 bb b--muted-3" />}
      </div>
      <div className="multiple-choice__title flex flex-column justify-center ml5">
        <div className="multiple-choice__name">{name}</div>
        <div className="single-choice__description pt2 mid-gray fw2">{description || null}</div>
      </div>
    </div>
  )
}