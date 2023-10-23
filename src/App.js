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
import EditMaterials from './components/materials/EditMaterials';
import DeleteMaterials from './components/materials/DeleteMaterials';
import BomList from './components/manufacture/billOfMaterials/BomList';
import Bom from './components/manufacture/billOfMaterials/Bom';
import CreateBom from './components/manufacture/billOfMaterials/CreateBom';
import EditBom from './components/manufacture/billOfMaterials/EditBom';
import DeleteBom from './components/manufacture/billOfMaterials/DeleteBom';
import PrintReqProd from './components/manufacture/reqProducts/PrintReqProd';

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
              <Route path="edit-material/:mId" element={<EditMaterials />} />
              <Route path="delete-material/:mId" element={<DeleteMaterials />} />
            </Route>
            <Route path="/bom" element={<Bom/>}>
              <Route index element={<BomList />} />
              <Route path="create-bom" element={<CreateBom />} />
              <Route path="edit-bom/:bomId" element={<EditBom />} />
              <Route path="delete-bom/:bomId" element={<DeleteBom />} />
              <Route path="printReqProd" element={<PrintReqProd />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
