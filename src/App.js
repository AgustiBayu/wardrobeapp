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
import SummaryBom from './components/manufacture/billOfMaterials/SummaryBom';
import Mo from './components/manufacture/manufacturingOrders/Mo';
import MoList from './components/manufacture/manufacturingOrders/MoList';
import CreateMo from './components/manufacture/manufacturingOrders/CreateMo';
import MarkAsTodo from './components/manufacture/manufacturingOrders/MarkAsTodo';
import EditMarkAsTodo from './components/manufacture/manufacturingOrders/EditMarkAsTodo';
import CheckAvailability from './components/manufacture/manufacturingOrders/CheckAvailability';
import EditCheckAvailability from './components/manufacture/manufacturingOrders/EditCheckAvailability';
import MarkAsDone from './components/manufacture/manufacturingOrders/MarkAsDone';
import EditMarkAsDone from './components/manufacture/manufacturingOrders/EditMarkAsDone';
import EditMo from './components/manufacture/manufacturingOrders/EditMo';
import DeleteMo from './components/manufacture/manufacturingOrders/DeleteMo';
import DetailAvailability from './components/manufacture/manufacturingOrders/DetailAvailability';
import Po from './components/purchase/purchaseOrder/Po';
import Supplier from './components/purchase/supplier/Supplier';
import SupplierList from './components/purchase/supplier/SupplierList';
import CreateSupplier from './components/purchase/supplier/CreateSupplier';
import EditSupplier from './components/purchase/supplier/EditSupplier';
import DeleteSupplier from './components/purchase/supplier/DeleteSupplier';
import PoList from './components/purchase/purchaseOrder/PoList';
import CreatePo from './components/purchase/purchaseOrder/CreatePo';
import EditPo from './components/purchase/purchaseOrder/EditPo';
import DeletePo from './components/purchase/purchaseOrder/DeletePo';
import ConfirmRfq from './components/purchase/purchaseOrder/ConfirmRfq';
import EditConfirmRfq from './components/purchase/purchaseOrder/EditConfirmRfq';
import ReceiveDemand from './components/purchase/purchaseOrder/ReceiveDemand';
import EditReceiveDemand from './components/purchase/purchaseOrder/EditReceiveDemand';
import PaymentPo from './components/purchase/paymentPo/PaymentPo';
import CreatePaymentPo from './components/purchase/paymentPo/CreatePaymentPo';
import EditPaymentPo from './components/purchase/paymentPo/EditPaymentPo';
import Customer from './components/purchase/customer/Customer';
import CustomerList from './components/purchase/customer/CustomerList';
import CreateCustomer from './components/purchase/customer/CreateCustomer';
import EditCustomer from './components/purchase/customer/EditCustomer';
import DeleteCustomer from './components/purchase/customer/DeleteCustomer';
import So from './components/purchase/salesOrder/So';
import SoList from './components/purchase/salesOrder/SoList';
import CreateSo from './components/purchase/salesOrder/CreateSo';
import EditSo from './components/purchase/salesOrder/EditSo';

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
            <Route path="/supplier" element={<Supplier/>}>
              <Route index element={<SupplierList />} />
              <Route path="create-supplier" element={<CreateSupplier />} />
              <Route path="edit-supplier/:supId" element={<EditSupplier />} />
              <Route path="delete-supplier/:supId" element={<DeleteSupplier />} />
            </Route>
            <Route path="/customer" element={<Customer/>}>
              <Route index element={<CustomerList />} />
              <Route path="create-customer" element={<CreateCustomer />} />
              <Route path="edit-customer/:cusId" element={<EditCustomer />} />
              <Route path="delete-customer/:cusId" element={<DeleteCustomer />} />
            </Route>
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
              <Route path="summaryBom" element={<SummaryBom />} />
            </Route>
            <Route path="/mo" element={<Mo/>}>
              <Route index element={<MoList />} />
              <Route path="create-mo" element={<CreateMo />} />
              <Route path="edit-mo/:moId" element={<EditMo />} />
              <Route path="delete-mo/:moId" element={<DeleteMo />} />
              <Route path="mark-as-todo" element={<MarkAsTodo />} />
              <Route path="mark-as-todo-edit/:moId" element={<EditMarkAsTodo />} />
              <Route path="check-availability" element={<CheckAvailability />} />
              <Route path="detail-availability/:moId" element={<DetailAvailability />} />
              <Route path="check-availability-edit/:moId" element={<EditCheckAvailability />} />
              <Route path="mark-as-done" element={<MarkAsDone />} />
              <Route path="mark-as-done-edit/:moId" element={<EditMarkAsDone />} />   
            </Route>
            <Route path="/po" element={<Po/>}>
              <Route index element={<PoList />} />
              <Route path="create-po" element={<CreatePo />} />
              <Route path="edit-po/:poId" element={<EditPo />} />
              <Route path="delete-po/:poId" element={<DeletePo />} />
              <Route path="confirm-rfq" element={<ConfirmRfq />} />
              <Route path="confirm-rfq-edit/:poId" element={<EditConfirmRfq />} />
              <Route path="receive-demand" element={<ReceiveDemand />} />
              <Route path="receive-demand-edit/:poId" element={<EditReceiveDemand />} />
              <Route path="payment-po" element={<PaymentPo />} />
              <Route path="create-payment-po/:poId" element={<CreatePaymentPo />} />
              <Route path="edit-payment-po/:payPoId" element={<EditPaymentPo />} />
            </Route>
            <Route path="/so" element={<So/>}>
              <Route index element={<SoList />} />
              <Route path="create-so" element={<CreateSo />} />
              <Route path="edit-so/:soId" element={<EditSo />} />
              <Route path="delete-so/:soId" element={<DeletePo />} />
              <Route path="confirm-rfq" element={<ConfirmRfq />} />
              <Route path="confirm-rfq-edit/:soId" element={<EditConfirmRfq />} />
              <Route path="receive-demand" element={<ReceiveDemand />} />
              <Route path="receive-demand-edit/:soId" element={<EditReceiveDemand />} />
              <Route path="payment-po" element={<PaymentPo />} />
              <Route path="create-payment-so/:soId" element={<CreatePaymentPo />} />
              <Route path="edit-payment-so/:paySoId" element={<EditPaymentPo />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
