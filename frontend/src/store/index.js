import { createSlice,configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn : false },  // if its is true then we are logged in
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
        },
    }
});

export const authActions = authSlice.actions; 

export const store = configureStore({
    reducer: authSlice.reducer
});