import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const AvatarIndexSlice = createSlice({
  name: "avatarIndex",
  initialState,
  reducers: {
    setAvatarIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAvatarIndex } = AvatarIndexSlice.actions;

export default AvatarIndexSlice.reducer;
