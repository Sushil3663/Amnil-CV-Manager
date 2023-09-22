
import { createSlice } from '@reduxjs/toolkit';

const blacklistReasonSlice = createSlice({
  name: 'blacklistReason',
  initialState: {},
  reducers: {
    setReason: (state, action) => {
      const { applicantID, reason } = action.payload;
      state[applicantID] = reason;
    },
    clearReason: (state, action) => {
      const { applicantID } = action.payload;
      delete state[applicantID];
    },
  },
});

export const { setReason, clearReason } = blacklistReasonSlice.actions;
export default blacklistReasonSlice.reducer;
