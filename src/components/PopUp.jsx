import React from 'react'
import { createPortal } from "react-dom"

const PopUp = ({ children, setIsOpen ,isAdmin}) => {
  return createPortal(
    <div className={`fixed flex flex-col justify-center items-center top-0 w-full overflow-auto ${isAdmin?"lg:pl-96 ":"lg:pl-0"}min-[320px]:pl-0 z-50 h-screen bg-black/20 transition-all`} onClick={() => setIsOpen(false)}>
      {children}
    </div>
    , document.getElementById("modal"))
}

export default PopUp