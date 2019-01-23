import { isMobileOnly } from 'react-device-detect'

const headerTopMenuClass = '.vtex-store-header-2-x-topMenuContainer'
const headerTransformConstant = 82

const getTopbarScrollOffset = () => {
  const topbar = document && document.querySelector(headerTopMenuClass)
  const topbarHeight = topbar ? topbar.clientHeight : 0
  const transformExtra = topbar && !isMobileOnly ? headerTransformConstant : 0
  return topbarHeight - transformExtra
}

export const scrollToElementTop = element => {
  setTimeout(() => {
    const positionToScroll = element.offsetTop - getTopbarScrollOffset()
    window.scrollTo({ top: positionToScroll, behavior: 'smooth' })
  }, 200)
}
