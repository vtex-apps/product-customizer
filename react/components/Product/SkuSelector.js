import { Fragment } from 'react'

import SingleChoice from '../Variation/Items/SingleChoice';

function SkuSelector({ items, selectedSku, onSkuChange }) {
  return (
    <Fragment>
      {items.map(item =>
        <SingleChoice item={{ name: item }} selected={item === selectedSku} onChange={() => onSkuChange(item)} key={item} />
      )}
    </Fragment>
  )
}

export default SkuSelector