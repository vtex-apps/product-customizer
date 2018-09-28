import React, { Component } from 'react'

class AttachmentListItem extends Component {
  render() {
    return (
      <div className={'vtex-product-customizer__attachment flex items-center pa5 pointer'}>
        <img className={'attachment_image-thumb mr4'} width="52" src="https://via.placeholder.com/72x72" />
        <div className={'attachment__content flex flex-column'}>
          <div className={'attachment__title'}>Stuffed Crust <span className={'attachment__specification'}>PREMIUM</span></div>
          <div className={'attachment__description pt2 mid-gray fw2'}>Our iconic crust, filled with delicious mozzarella</div>
        </div>
        <div className={'attachment__price mh4 w4 near-black tc'}>R$ 69,90</div>
      </div>
    )
  }
}

export default AttachmentListItem
