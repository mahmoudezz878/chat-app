import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../types";

const initialState: AppState = { token: "", user: null }

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
      console.log(payload);
    },
    setUser(state, { payload }) {
        state.user = payload;
        console.log(payload);
    },
    signOut(state) {
      state.user = null;
      state.token = "";
    }
  },
});

export const {setToken, setUser, signOut} = appSlice.actions
export default appSlice.reducer