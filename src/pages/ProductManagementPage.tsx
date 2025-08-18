import Avatar from "../components/Avatar";
import Logo from "../components/logo";

const ProductManagementPage = () => {
  return (
    <main className="grid h-full w-full grid-cols-24 grid-rows-[auto_1fr]">
      <header className="col-span-24 flex items-center justify-between bg-red-200 px-4 py-4">
        <Logo />
        <Avatar />
      </header>
      <nav className="col-span-3 bg-yellow-200 p-4">this is nav</nav>
      <section className="col-span-21 bg-green-200 p-4">main content</section>
    </main>
  );
};

export default ProductManagementPage;
