const Header = ({ children }) => {
  return (
    <header className="h-16 flex items-center px-6 justify-between border-b-2 shadow-md">
        {children}
    </header>
  )
}

export default Header