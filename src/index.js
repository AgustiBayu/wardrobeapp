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

const store = configureStore({
  reducer: {
    products: productsReducer,
    categoryProducts: categoryProductsReducer,
    materials: materialsReducer,
  },
});

store.dispatch(productsFetch());
store.dispatch(categoryProductsFetch());
store.dispatch(materialsFetch());

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
