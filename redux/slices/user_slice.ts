import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format, getYear } from "date-fns";

interface UserState {
  name: string;
  selected_month?: string;
  creation_month: string;
  selected_year?: number;
  creation_year: number;
  profile_completed?: boolean;
}
const currentMonth = format(new Date(), "MMM");
const currentYear = getYear(new Date());
const initial_state: UserState = {
  name: "Human",
  selected_month: currentMonth,
  creation_month: currentMonth,
  selected_year: currentYear,
  creation_year: currentYear,
  profile_completed: false,
};

const user_slice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    set_user_profile: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.creation_month = action.payload.creation_month;
      state.selected_month = action.payload.selected_month;
      state.creation_year = action.payload.creation_year;
      state.selected_year = action.payload.selected_year;
      state.profile_completed = true;
    },
    clear_user_profile: (state) => {
      state.name = "";
      state.creation_month = currentMonth;
      state.selected_month = currentMonth;
      state.selected_year = currentYear;
      state.creation_year = currentYear;
      state.profile_completed = false;
    },
    set_selected_month_year: (
      state,
      action: PayloadAction<{ selected_year: number; selected_month: string }>
    ) => {
      state.selected_month = action.payload.selected_month;
      state.selected_year = action.payload.selected_year;
    },
  },
});

export const { set_user_profile, clear_user_profile, set_selected_month_year } =
  user_slice.actions;

export default user_slice.reducer;
