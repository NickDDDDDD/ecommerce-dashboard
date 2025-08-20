import Logo from "../components/Logo";
import Avatar from "../components/Avatar";
import { Outlet } from "react-router";
import NavItem from "../components/NavItem";
const DashboardLayout = () => {
  return (
    <main className="grid h-full w-full grid-cols-24 grid-rows-[auto_1fr]">
      <header className="col-span-24 flex items-center justify-between bg-gray-100 px-4 py-4">
        <Logo />
        <Avatar />
      </header>
      <nav className="col-span-3 p-4">
        <div className="mb-2 border-b-1 border-gray-200 pb-2">
          <NavItem to="/">Dashboard</NavItem>
        </div>{" "}
        <ul>
          <li>
            <NavItem to="/products">商品管理</NavItem>
          </li>
          <li>
            <NavItem to="/orders">订单管理</NavItem>
          </li>
        </ul>
      </nav>
      <section className="col-span-21 p-4">
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
