import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import NavBar from "./components/dashboard/NavBar";
import SideBar from './components/dashboard/SideBar';

import Products from "./components/products/Products";
import ProductsList from "./components/products/ProductsList";
import CreateProducts from "./components/products/CreateProducts";
import EditProducts from './components/products/EditProducts';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteProducts from './components/products/DeleteProducts';
import Materials from './components/materials/Materials';
import MaterialsList from './components/materials/MaterialsList';
import CreateMaterials from './components/materials/CreateMaterials';

export default function App() {
  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <SideBar />
        <div className="flex mt-[64px] ml-[256px] p-[50px]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="create-product" element={<CreateProducts />} />
              <Route path="edit-product/:pId" element={<EditProducts />} />
              <Route path="delete-product/:pId" element={<DeleteProducts />} />
            </Route>
            <Route path="/materials" element={<Materials/>}>
              <Route index element={<MaterialsList />} />
              <Route path="create-material" element={<CreateMaterials />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
