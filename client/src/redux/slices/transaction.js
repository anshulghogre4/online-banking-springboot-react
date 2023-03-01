import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrs = createAsyncThunk('fetchTrs', async (accno) => {
    const response =await fetch('http://localhost:8081/transactions/sender/'+accno);
    return response.json();

});

const trSlice = createSlice({
    name: "transaction",
    initialState:{
        isLoading:false,
        data:null,
        isError : false,
    },
    extraReducers: (builder) =>
    {
        builder.addCase(fetchTrs.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTrs.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTrs.rejected, (state,action)=>{
            console.log('Error', action.payload);
            state.isError = true;
        })
    }

});
export default trSlice.reducer;
