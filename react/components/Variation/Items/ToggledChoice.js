import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'vtex.styleguide'

import '../../../global.css'

const ToggledChoice = ({ imageUrl, name, selected, onChange, disabled }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label
    className={`vtex-product-customizer__toggled-choice ${
      selected ? 'selected bg-washed-blue' : 'hover-bg-near-white'
    } db pa4 pointer bb b--light-gray`}
  >
    <div className="relative flex items-center">
      <div className="flex-none pv2">
        <img src={imageUrl} width="48" className="br3" />
      </div>
      <div className="flex-auto ml5">
        <div className="toggled-choice__name t-heading-5">{name}</div>
      </div>
      <div className={`${disabled ? 'o-70' : ''}`}>
        <Checkbox
          id={`${name}-choice`}
          disabled={disabled}
          name={name}
          checked={selected}
          onChange={() => onChange(name)}
        />
      </div>
    </div>
  </label>
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
