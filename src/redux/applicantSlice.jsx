import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applicants: [],
  };

const applicantSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers: {
    setApplicants: (state, action) => {
        state.applicants = action.payload;
      },
      addApplicant: (state, action) => {
        state.applicants.push(action.payload);
      },
},
});

export const { setApplicants, addApplicant } = applicantSlice.actions;

export default applicantSlice.reducer;
