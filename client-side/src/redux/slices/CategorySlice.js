import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const fetchCategoryData = createAsyncThunk("get/categorys", async () => {
  try {
    const response = await axiosClient.get("/categories?populate=image");
    // console.log("THUNK CATEGORY RESPONSE =>", response.data.data);

    return response.data.data;
  } catch (error) {
    Promise.reject(error);
  }
});

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
