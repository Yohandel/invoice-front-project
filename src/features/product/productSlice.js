import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
    },
    reducers: {
        add: (state, action) => {
            state.list.push(action.payload)
            state.list.sort((a, b) => {
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
            state.list = action.payload

            console.log(state.list);
        },

        deleteProduct: (state, action) => {
            state.list = action.payload.filter((prouct) => prouct._id !== action.payload?._id)
            console.log(action.payload);
        }
    },
})

// Action creators are generated for each case reducer function
export const { add, toList, deleteProduct } = productSlice.actions

export default productSlice.reducer