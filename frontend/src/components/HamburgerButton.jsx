import { BsArrowsCollapse } from "react-icons/bs"
import { MdOutlineExpand } from "react-icons/md"

import { useGlobalContext } from "../store/context/globalContext"

const HamburgerButton = () => {
  const { filtersVisible, hideFilters, showFilters } = useGlobalContext()

  function toggle() {
    if (filtersVisible === true) {
      hideFilters()
    } else {
      showFilters()
    }
  }

  if (window.location.pathname !== "/catalog") return

  return (
    <button
      className="ham-btn"
      onClick={toggle}
    >
      {filtersVisible ? <BsArrowsCollapse /> : <MdOutlineExpand />}
    </button>
  )
}

export default HamburgerButton
