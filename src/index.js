import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./slices/sliceProducts";
import categoryProductsReducer, { categoryProductsFetch } from "./slices/sliceCategoryProducts";
import materialsReducer, { materialsFetch } from "./slices/sliceMaterials";
import supplierReducer, { supplierFetch } from "./slices/sliceSupplier";
import bomReducer, { bomFetch, summaryBomFetch } from "./slices/sliceBom";
import moReducer, { moFetch } from "./slices/sliceMo";
import poReducer, { poFetch } from "./slices/slicePo";
import payPoReducer, { payPoFetch } from "./slices/slicePaymentPo";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categoryProducts: categoryProductsReducer,
    materials: materialsReducer,
    supplier: supplierReducer,
    bom: bomReducer,
    mo: moReducer,
    po: poReducer,
    payPo: payPoReducer,
  },
});

store.dispatch(productsFetch());
store.dispatch(categoryProductsFetch());
store.dispatch(materialsFetch());
store.dispatch(supplierFetch());
store.dispatch(bomFetch());
store.dispatch(summaryBomFetch());
store.dispatch(moFetch());
store.dispatch(poFetch());
store.dispatch(payPoFetch());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
