function Header({ children }) {
  return (
    <header className="flex items-center justify-between w-full bg-white space-x-100">
      {children}
    </header>
  );
}

export default Header;
