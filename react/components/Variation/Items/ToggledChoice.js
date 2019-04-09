import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'vtex.styleguide'

import ItemDescription from './ItemDescription'

import styles from '../../../styles.css'

const ToggledChoice = ({ imageUrl, name, selected, onChange, disabled }) => (
  <div
    className={`${styles.toggleChoiceContainer} ${
      selected ? 'selected bg-washed-blue' : 'hover-bg-near-white'
    } db pa4 pointer bb b--light-gray`}
  >
    <div className="relative flex justify-between items-center">
      <ItemDescription 
          name={name}
          imageUrl={imageUrl}
          containerClass={styles.itemDescriptionContainerToggle}
          nameClass={styles.itemDescriptionNameToggle}
          descriptionClass={styles.itemDescriptionToggle}
        />
      <div className={`${styles.toggleChoiceActions} ${disabled ? 'o-70' : ''}`}>
        <Checkbox
          disabled={disabled}
          name={name}
          checked={selected}
          onChange={() => onChange(name)}
        />
      </div>
    </div>
  </div>
)

ToggledChoice.propTypes = {
  /* Max limit of selections */
  selected: PropTypes.bool,
  /* Trigger function to handle changes on inputs  */
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
}

export default memo(ToggledChoice)
