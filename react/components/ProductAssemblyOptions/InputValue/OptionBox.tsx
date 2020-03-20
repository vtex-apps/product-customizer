import React, { FC } from 'react'
import classNames from 'classnames'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import slugify from '../../../modules/slugify'
import styles from '../styles.css'

const CSS_HANDLES = ['inputValueOptionBox'] as const

const OptionBox: FC<Props> = ({ option, selected, onClick, onKeyDown }) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div
      role="button"
      tabIndex={0}
      className={classNames(
        applyModifiers(handles.inputValueOptionBox, slugify(option)),
        'relative di pointer flex items-center outline-0 mr4'
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
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
        <div className="c-on-base center pv3 ph5 z-1 t-body">{option}</div>
      </div>
    </div>
  )
}

interface Props {
  option: string
  selected: boolean
  onClick: React.MouseEventHandler
  onKeyDown: React.KeyboardEventHandler
}

export default OptionBox
