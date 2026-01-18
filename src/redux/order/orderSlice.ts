// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface OrderState {
//     orders: any[];
//     isLoading: boolean;
//     currentOrder: any | null;
// }

// const initialState: OrderState = {
//     orders: [],
//     isLoading: false,
//     currentOrder: null,
// };

// export const orderSlice = createSlice({
//     name: 'order',
//     initialState,
//     reducers: {
//         setOrders: (state, action: PayloadAction<any[]>) => {
//             state.orders = action.payload;
//         },
//         addOrder: (state, action: PayloadAction<any>) => {
//             state.orders.push(action.payload);
//         },
//         setCurrentOrder: (state, action: PayloadAction<any>) => {
//             state.currentOrder = action.payload;
//         },
//         setLoading: (state, action: PayloadAction<boolean>) => {
//             state.isLoading = action.payload;
//         },
//     },
//     extraReducers: () => {
//         // Add async thunks here if needed
//     },
// });

// export const {
//     setOrders,
//     addOrder,
//     setCurrentOrder,
//     setLoading
// } = orderSlice.actions;

// export default orderSlice.reducer;
