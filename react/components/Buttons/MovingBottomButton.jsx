import React, { Fragment, PureComponent } from 'react'

import AddToCart from './AddToCart'

class MovingBottomButton extends PureComponent {
  scrollingButton = React.createRef()
  fixedButton = React.createRef()

  showScrollingButton = false

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.ready && this.props.ready) {
      this.handleScroll()
    }
  }

  handleScroll = () => {
    const fixedButtonY = this.fixedButton.current.offsetTop
    const scrollingButtonY =
      this.scrollingButton.current.offsetTop - window.pageYOffset
    if (scrollingButtonY <= fixedButtonY) {
      if (!this.showScrollingButton) {
        this.showScrollingButton = true
        this.fixedButton.current.style.visibility = 'hidden'
        this.scrollingButton.current.style.visibility = 'visible'
      }
    }
    if (scrollingButtonY > fixedButtonY) {
      if (this.showScrollingButton) {
        this.showScrollingButton = false
        this.fixedButton.current.style.visibility = 'visible'
        this.scrollingButton.current.style.visibility = 'hidden'
      }
    }
  }

  render() {
    const { ready, total, onSubmitAddToCart, isLoading } = this.props
    return (
      <Fragment>
        <div
          className="vtex-product-customizer__actions w-100"
          ref={this.scrollingButton}
        >
          <AddToCart
            ready={ready}
            total={total}
            onClick={onSubmitAddToCart}
            isLoading={isLoading}
          />
        </div>
        <div
          className="vtex-product-customizer__actions z-2 fixed bg-white bottom-0 w-40-ns ph1-ns w-100 bt b--light-gray"
          ref={this.fixedButton}
        >
          <AddToCart
            ready={ready}
            total={total}
            onClick={onSubmitAddToCart}
            isLoading={isLoading}
          />
        </div>
      </Fragment>
    )
  }
}

export default MovingBottomButton
