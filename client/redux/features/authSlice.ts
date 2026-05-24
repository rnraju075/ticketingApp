import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface AuthState {
  currentUser: User | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<User | null>
    ) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;