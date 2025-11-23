import { useRef } from "react";
import { Link } from "react-router-dom";

const Tab = ({ children, setPosition, to, isActive, onClick, onHover }) => {
  const ref = useRef(null);

  return (
    <Link
      ref={ref}
      to={to}
      data-to={to}
      onClick={onClick}
      onMouseEnter={() => {
        onHover();
        if (!ref?.current) return;
        const { width, left } = ref.current.getBoundingClientRect();
        const parentLeft = ref.current.parentElement.getBoundingClientRect().left;
        setPosition({ left: left - parentLeft, width, opacity: 1 });
      }}
      className={`
        relative z-10 block cursor-pointer px-3 py-1.5 text-xs transition-all duration-200
        md:px-5 md:py-2.5 md:text-base
        rounded-full
        ${isActive ? 'bg-white text-gray-900' : 'text-gray-300'}
        hover:bg-white hover:text-gray-900
      `}
    >
      {children}
    </Link>
  );
};
export default Tab;