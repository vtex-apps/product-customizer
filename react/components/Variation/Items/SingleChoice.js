import PropTypes from 'prop-types'
import React, { Fragment, memo } from 'react'
import ProductPrice from 'vtex.store-components/ProductPrice'
import Radio from 'vtex.styleguide/Radio'
import ItemDescription from './ItemDescription'

import styles from '../../../styles.css'

const SingleChoice = ({
  imageUrl,
  name,
  price,
  selected,
  onChange,
  showPlus,
}) => {
  const calculatedPrice = (price / 100).toFixed(2)
  const parsedPrice = parseFloat(calculatedPrice)

  const description = parsedPrice === 0 ? null :
   (
    <Fragment>
      {showPlus && <div>+ </div>}
      <ProductPrice
        {...{
          showLabels: false,
          showListPrice: false,
          sellingPrice: parsedPrice,
        }}
      />
    </Fragment>
  )

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === ' ' && onChange(name, true)}
      onClick={() => onChange(name, true)}
      className={`${selected &&
        'selected bg-muted-5'} ${styles.singleChoiceContainer} hover-bg-muted-5 ph4 pointer bb b--muted-5 bw1`}
    >
      <div className="relative flex items-center justify-between pv5">
        <ItemDescription 
          description={description}
          name={name}
          imageUrl={imageUrl}
          containerClass={styles.itemDescriptionContainerSingle}
          nameClass={styles.itemDescriptionNameSingle}
          descriptionClass={`${styles.itemDescriptionSingle} flex t-small fw5 c-action-primary mt1`}
        />
        <div className={`${styles.singleChoiceActions} mt3`}>
          <Radio
            checked={selected}
            // Required but useless props
            {...{ id: '', label: '', name: '', value: '', onChange: () => {} }}
          />
        </div>
      </div>
    </div>
  )
}

SingleChoice.propTypes = {
  /* Define if current component is selected  */
  selected: PropTypes.bool,
  /* Trigger function to handle changes on inputs  */
  onChange: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  showPlus: PropTypes.bool,
}

export default memo(SingleChoice)
