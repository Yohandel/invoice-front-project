import { createSlice } from "@reduxjs/toolkit";

export const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        stockList: []
    },
    reducers: {
        add: (state, action) => {
            state.stockList.push(action.payload)
            state.stockList.sort((a, b) => {
                if (a._id > b._id) {
                    return -1
                }

                if (a._id < b._id) {
                    return 1
                }

                return 0
            })
        },

        toList: (state, action) => {
            state.stockList = action.payload
        },

    }
})

export const {add, toList} = stockSlice.actions

export default stockSlice.reducer