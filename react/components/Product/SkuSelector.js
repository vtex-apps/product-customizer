import { Fragment } from 'react'

function SkuSelector({ items, onSkuChange }) {
  return (
    <Fragment>
      {items.map(item =>
        <div onClick={() => onSkuChange(item)} key={item}>
          {item}
        </div>
      )}
    </Fragment>
  )
}

export default SkuSelector