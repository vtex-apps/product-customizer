import React, { Component } from 'react'

import AttachmentListItem from './AttachmentListItem'

class AttachmentsList extends Component {
  render() {
    return (
      <div className={'vtex-product-customizer__options bg-light-gray bg-transparent-ns overflow-auto'}>
        <h4 className={'ma0 pa5'}><span className={'f5 fw5'}>Select your size & crust</span></h4>
        <div className={'vtex-product-customizer__skus bg-white'}>
          <h4 className={'sku-title b--light-gray bn-ns bb ma0 pa5 f5 fw5'}>Large <span className={'fw2 ml3'}>10 slices</span></h4>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((key) => {
            return <AttachmentListItem key={key} />
          })}
        </div>
      </div>
    )
  }
}

export default AttachmentsList
