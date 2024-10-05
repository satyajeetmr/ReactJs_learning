import { Route, Routes } from "react-router-dom";
import Home from "../dashbord/Home";
import Login from "../dashbord/Login";
import ProductListing from "../dashbord/ProductListing";
import SingleProduct from "../dashbord/SingleProduct";
import PrivateRoutes from "../utils/PrivateRoutes";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/products/" element={<ProductListing />} />
        <Route path="/products/single/:id" element={<SingleProduct />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RouterComponent;
