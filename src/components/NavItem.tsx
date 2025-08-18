import { NavLink, type NavLinkProps } from "react-router";
import { twMerge } from "tailwind-merge";
const NavItem = ({ children, ...props }: NavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        twMerge("block p-2", isActive && "bg-blue-500")
      }
      end
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
