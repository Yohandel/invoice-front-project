import {configureStore} from '@reduxjs/toolkit'
import productSlice from '../features/product/productSlice'
import stockSlice from '../features/stock/stockSlice'

export default configureStore({
    reducer:{
        products: productSlice,
        stock: stockSlice
    },
})