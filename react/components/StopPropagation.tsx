// Why this is needed you ask?
// See: https://github.com/facebook/react/issues/11387

import React from 'react'
import type { PropsWithChildren } from 'react'

const stop = (e: Event) => e.stopPropagation()

const eventHandlers = {
  onClick: stop,
  onContextMenu: stop,
  onDoubleClick: stop,
  onDrag: stop,
  onDragEnd: stop,
  onDragEnter: stop,
  onDragExit: stop,
  onDragLeave: stop,
  onDragOver: stop,
  onDragStart: stop,
  onDrop: stop,
  onMouseDown: stop,
  onMouseEnter: stop,
  onMouseLeave: stop,
  onMouseMove: stop,
  onMouseOver: stop,
  onMouseOut: stop,
  onMouseUp: stop,

  onKeyDown: stop,
  onKeyPress: stop,
  onKeyUp: stop,

  onFocus: stop,
  onBlur: stop,

  onChange: stop,
  onInput: stop,
  onInvalid: stop,
  onSubmit: stop,
}

// eslint-disable-next-line @typescript-eslint/ban-types
function NoPropagation({ children }: PropsWithChildren<{}>) {
  return (
    <>
      {/* @ts-expect-error Purposedfully stops propagation of all events */}
      <div {...eventHandlers} style={{ display: 'contents' }}>
        {children}
      </div>
    </>
  )
}

export default NoPropagation
