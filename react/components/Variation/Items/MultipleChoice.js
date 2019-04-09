import PropTypes from 'prop-types'
import React, { Fragment, memo } from 'react'
import NumericStepper from 'vtex.styleguide/NumericStepper'
import ProductPrice from 'vtex.store-components/ProductPrice'
import ItemDescription from './ItemDescription'

import styles from '../../../styles.css'

const MultipleChoice = ({
  imageUrl,
  price,
  name,
  chosenAmount,
  canIncrease,
  canDecrease,
  onChange,
}) => {
  const calculatedPrice = (price / 100).toFixed(2)
  const parsedPrice = parseFloat(calculatedPrice)
  const isSelected = !!chosenAmount

  const sellingPriceClass = 'c-action-primary t-small fw5'

  const description = !!parsedPrice && (
    <Fragment>
      <div>+ </div>
      <ProductPrice
        {...{
          showLabels: false,
          showListPrice: false,
          sellingPrice: parsedPrice,
          sellingPriceClass,
        }}
      />
    </Fragment>
  )

  return (
    <div
      className={`${styles.multipleChoiceContainer} ${isSelected &&
        'selected bg-muted-5'} hover-bg-muted-5 w-100 ph4 pv5 bb b--muted-5`}
    >
      <div className="relative flex justify-between items-center">
        <ItemDescription 
          description={description}
          name={name}
          imageUrl={imageUrl}
          containerClass={styles.itemDescriptionContainerMultiple}
          nameClass={styles.itemDescriptionNameMultiple}
          descriptionClass={`${styles.itemDescriptionMultiple} flex items-center c-action-primary t-small fw5 mt1`}
        />
        <div className="flex-auto flex-none-ns flex justify-end">
          <div className={`${styles.multipleChoiceActions} flex-none ml4 c-action-primary t-body fw5 z-1`}>
            <NumericStepper
              lean
              value={chosenAmount}
              minValue={chosenAmount - canDecrease}
              maxValue={chosenAmount + canIncrease}
              onChange={({ value }) => onChange(value, name)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

MultipleChoice.propTypes = {
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  chosenAmount: PropTypes.number,
  canIncrease: PropTypes.bool,
  canDecrease: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default memo(MultipleChoice)
