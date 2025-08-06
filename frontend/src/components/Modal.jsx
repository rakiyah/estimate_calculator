
const Modal = ({ children }) => {
  return (
    <div className='fixed w-screen h-screen inset-0 bg-zinc-950/80 flex items-center justify-center z-50'>
      {/* <div className=''> */}
        {children}
      {/* </div> */}
    </div>
  )
}

export default Modal