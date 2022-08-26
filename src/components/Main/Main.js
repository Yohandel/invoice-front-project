import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home } from '../Home/Home';
import { ProductsList } from '../Products/ProductsList';
import { Stock } from '../Stock/Stock';

export const Main = () => {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<ProductsList />} />
    <Route path="/stock" element={<Stock />} />
  </Routes>
  )
}
