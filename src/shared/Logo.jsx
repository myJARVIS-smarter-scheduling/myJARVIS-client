import {
  HiOutlineMenu,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";

function Logo() {
  return (
    <div className="flex items-center min-w-200 space-x-15">
      <div className="flex items-center">
        <img
          src="/assets/myJARVIS_logo_square.png"
          alt="myJARVIS_logo"
          className="w-45 h-45"
        />
        <p className="text-xl font-extrabold">myJARVIS</p>
      </div>
    </div>
  );
}

export default Logo;
