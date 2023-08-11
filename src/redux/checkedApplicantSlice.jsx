import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
  selectedRows: []
};

const checkedApplicantSlice = createSlice({
  name: 'checkedApplicant',
  initialState,
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    deleteSelectedApplicant:(state,action) =>{
      state.selectedRows = state.selectedRows.filter((element)=>{
        return element.id !== action.payload
      })
    },
  },
});

export const {  setSelectedRows, deleteSelectedApplicant  } = checkedApplicantSlice.actions;

export default checkedApplicantSlice.reducer;
