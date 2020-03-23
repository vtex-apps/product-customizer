import PropTypes from 'prop-types'
import React, { memo } from 'react'
import Button from 'vtex.styleguide/Button'
import { FormattedMessage } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'

const AddToCart = ({ total, ready, onClick, isLoading }) => {
  if (!ready) return null
  const calculatedTotal = (total / 100).toFixed(2)

  return (
    <div className="actions--add-to-cart tc pa5">
      <Button type="submit" onClick={onClick} isLoading={isLoading} block>
        <div className="flex w-100 justify-between items-center">
          <FormattedMessage id="store/product-customizer.add-to-cart" />
          <ProductPrice
            showLabels={false}
            showListPrice={false}
            sellingPrice={calculatedTotal}
            listPrice={calculatedTotal}
          />
        </div>
      </Button>
    </div>
  )
}

AddToCart.propTypes = {
  /* Total of current selected variations */
  total: PropTypes.number,
  /* Toggle the button state if there's not selected variations */
  ready: PropTypes.bool,
  /* Handles submit skus to orderForm */
  onClick: PropTypes.func,
  /* Show loading state when skus are being added to orderForm */
  isLoading: PropTypes.bool,
}

export default memo(AddToCart)
