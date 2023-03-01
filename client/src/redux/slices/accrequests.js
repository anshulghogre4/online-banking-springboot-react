import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAcc = createAsyncThunk('fetchAcc', async () => {
    const response =await fetch('http://localhost:8081/account/getallreq');
    return response.json();

});

const accSlice = createSlice({
    name: "requests",
    initialState:{
        isLoading:false,
        data:null,
        isError : false,
    },
    extraReducers: (builder) =>
    {
        builder.addCase(fetchAcc.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAcc.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAcc.rejected, (state,action)=>{
            console.log('Error', action.payload);
            state.isError = true;
        })
    }

});
export default accSlice.reducer;
