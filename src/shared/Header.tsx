import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="flex items-center justify-between w-full bg-white space-x-100">
      {children}
    </header>
  );
}

export default Header;
