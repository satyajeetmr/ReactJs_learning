import { Route, Routes } from "react-router-dom";
import Home from "../dashbord/Home";
import CrudForm from "../dashbord/CrudForm";
import Form from "../dashbord/Form";
import FormData from "../dashbord/FormData";
import Listing from "../dashbord/CrudForm/Listing";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crud-form/" element={<CrudForm />} />
      <Route path="/crud-form/:id" element={<CrudForm />} />
      <Route path="/form" element={<Form />} />
      <Route path="/form-data" element={<FormData />} />
      <Route path="/crud-form/list" element={<Listing />} />
    </Routes>
  );
};

export default RouterComponent;
