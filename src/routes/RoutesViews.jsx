import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import Error404 from "../pages/Error404";
import AdminPage from "../pages/AdminPage";
import PrivateRoutes from "../components/PrivateRoutes";
const RoutesViews = () => {
  return (
    <Routes>
      <Route
        path="/administrador"
        element={
          <PrivateRoutes role={"admin"}>
            <AdminPage />
          </PrivateRoutes>
        }
      />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default RoutesViews;
