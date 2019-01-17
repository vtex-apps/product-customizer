import React, { Fragment, PureComponent } from 'react'

import AddToCart from './AddToCart'

class MovingBottomButton extends PureComponent {

  scrollingButton = React.createRef();
  fixedButton = React.createRef();

  showScrollingButton = false

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {

    const fixedButtonRect = this.fixedButton.current.getBoundingClientRect()
    const scrollingButtonRect = this.scrollingButton.current.getBoundingClientRect()

    if (scrollingButtonRect.y <= fixedButtonRect.y) {
      if (!this.showScrollingButton) {
        this.showScrollingButton = true
        this.fixedButton.current.style.visibility = 'hidden'
        this.scrollingButton.current.style.visibility = 'visible'
      }
    }
    if (scrollingButtonRect.y > fixedButtonRect.y) {
      if (this.showScrollingButton) {
        this.showScrollingButton = false
        this.fixedButton.current.style.visibility = 'visible'
        this.scrollingButton.current.style.visibility = 'hidden'
      }
    }
  }

  render() {
    const { ready, total, handleSubmitAddToCart, isAddingToCart } = this.props
    return (
      <Fragment>
        <div className={`vtex-product-customizer__actions`} ref={this.scrollingButton}>
          <AddToCart ready={ready} total={total} onClick={handleSubmitAddToCart} isLoading={isAddingToCart} />
        </div>
        <div className={`vtex-product-customizer__actions fixed bg-white bottom-0 left-0 right-0 bt b--light-gray`} ref={this.fixedButton}>
          <AddToCart ready={ready} total={total} onClick={handleSubmitAddToCart} isLoading={isAddingToCart} />
        </div>
      </Fragment>
    )
  }
}

export default MovingBottomButton