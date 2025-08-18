import { createBrowserRouter } from "react-router";
import App from "./App";
import DashboardHomePage from "./pages/DashboardHomePage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: DashboardHomePage },
      { path: "products", Component: ProductsPage },
      { path: "orders", Component: OrdersPage },
    ],
  },
]);
