import { NavLink, type NavLinkProps } from "react-router";
import { twMerge } from "tailwind-merge";
const NavItem = ({ children, ...props }: NavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        twMerge(
          "relative block rounded-md p-2",
          isActive &&
            "bg-gray-200 before:absolute before:top-1 before:bottom-1 before:-left-2 before:w-1 before:rounded-full before:bg-blue-600",
        )
      }
      end
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
