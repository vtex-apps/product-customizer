import React, { memo } from 'react'
import PropTypes from 'prop-types'

import styles from '../../../styles.css'
function ItemDescription({ description, name, imageUrl, containerClass, nameClass, descriptionClass }) {
  return (
    <div className={`${styles.itemDescriptionContainer} ${containerClass} flex`}>
      <div>
        {imageUrl && (
          <img
            src={imageUrl}
            className="br3 mr4"
            style={{ height: '54px', width: '54px' }}
          />
        )}
      </div>
      <div className="flex flex-column justify-center">
        <div className={`${styles.itemDescriptionName} ${nameClass} t-heading-5 c-on-base`}>
          {name}
        </div>
        {description && <div className={`${styles.itemDescription} ${descriptionClass}`}>{description}</div>}
      </div>
    </div>
  )
}

ItemDescription.propTypes = {
  description: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  containerClass: PropTypes.string.isRequired,
  nameClass: PropTypes.string.isRequired,
  descriptionClass: PropTypes.string.isRequired,
}

export default memo(ItemDescription)
