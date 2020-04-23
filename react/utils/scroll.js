const headerTopMenuClass = '.vtex-store-header-2-x-topMenuContainer'

const getTopbarScrollOffset = () => {
  const topbar = document && document.querySelector(headerTopMenuClass)
  const rect = topbar ? topbar.getBoundingClientRect() : { height: 0, top: 0 }
  return rect.height + rect.top
}

export const scrollToElementTop = (element) => {
  setTimeout(() => {
    const positionToScroll = element.offsetTop - getTopbarScrollOffset()
    window.scrollTo({ top: positionToScroll, behavior: 'smooth' })
  }, 200)
}
