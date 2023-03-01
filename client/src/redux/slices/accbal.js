import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBal = createAsyncThunk('fetchBal', async (accno) => {
    //accno=47572987;
    const response =await fetch('http://localhost:8081/account/checkbal/'+accno);
    return response.json();

});

const balSlice = createSlice({
    name: "accbal",
    initialState:{
        isLoading:false,
        data:null,
        isError : false,
    },
    extraReducers: (builder) =>
    {
        builder.addCase(fetchBal.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchBal.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchBal.rejected, (state,action)=>{
            console.log('Error', action.payload);
            state.isError = true;
        })
    }

});
export default balSlice.reducer;