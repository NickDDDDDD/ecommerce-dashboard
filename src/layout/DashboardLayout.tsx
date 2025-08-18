import Logo from "../components/Logo";
import Avatar from "../components/Avatar";
import { Outlet } from "react-router";
import NavItem from "../components/NavItem";
const DashboardLayout = () => {
  return (
    <main className="grid h-full w-full grid-cols-24 grid-rows-[auto_1fr]">
      <header className="col-span-24 flex items-center justify-between bg-red-200 px-4 py-4">
        <Logo />
        <Avatar />
      </header>
      <nav className="col-span-3 bg-yellow-200 p-4">
        <ul>
          <li>
            <NavItem to="/">Dashboard</NavItem>
          </li>
          <li>
            <NavItem to="/products">Products</NavItem>
          </li>
          <li>
            <NavItem to="/orders">Orders</NavItem>
          </li>
        </ul>
      </nav>
      <section className="col-span-21 bg-green-200 p-4">
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
