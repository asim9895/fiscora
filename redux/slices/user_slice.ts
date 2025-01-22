import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  selected_month?: Date;
  creation_month: Date | null;
}

const initial_state: UserState = {
  name: "Human",
  selected_month: new Date(),
  creation_month: null,
};

const user_slice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    set_user_profile: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;

      state.creation_month = action.payload.creation_month;
    },
    clear_user_profile: (state) => {
      state.name = "";
      state.creation_month = null;
      state.selected_month = new Date();
    },
    set_selected_month: (
      state,
      action: PayloadAction<{ selected_month: Date }>
    ) => {
      state.selected_month = action.payload.selected_month;
    },
  },
});

export const { set_user_profile, clear_user_profile, set_selected_month } =
  user_slice.actions;

export default user_slice.reducer;
