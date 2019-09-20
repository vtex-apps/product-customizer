import React, { FC } from 'react'
import classNames from 'classnames'
import slugify from '../../../modules/slugify'
import styles from '../styles.css'

const OptionBox: FC<Props> = ({ option, selected, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={classNames(
        styles.skuSelectorItem,
        `${styles.skuSelectorItem}--${slugify(option)}`,
        'relative di pointer flex items-center outline-0 mr4',
      )}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick(e)}
    >
      <div
        className={classNames(
          styles.frameAround,
          'absolute b--action-primary br3 bw1',
          {
            ba: selected,
          }
        )}
      />
      <div
        className={classNames(
          'w-100 h-100 ba br2 bw1 b--muted-4 z-1 c-muted-5 flex items-center overflow-hidden',
          {
            'hover-b--muted-2': !selected,
          }
        )}
      >
        <div className="c-on-base center pv3 ph5 z-1 t-body">
          {option}
        </div>
      </div>
    </div>
  )
}

interface Props {
  option: string
  selected: boolean
  onClick: (e: any) => void
}

export default OptionBox
