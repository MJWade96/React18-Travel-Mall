import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (paramaters: {
      email: string,
      password: string,
  }, thunkAPI) => {
    const { data } = await axios.post(
      `https://www.fastmock.site/mock/5b495200ad3868c6a83b987e5bf215d7/travel/api/user`,{
          email: paramaters.email,
          password: paramaters.password
      }
    );
    return data.token;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(signIn.rejected, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
});
