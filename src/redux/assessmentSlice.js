import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    assessments: [],
  };

  const assessmentSlice = createSlice({
    name: 'assessments',
    initialState,
    reducers: {
      setAssessments: (state, action) => {
        state.assessments = action.payload;
      },
      addAssessment: (state, action) => {
        state.assessments.push(action.payload);
      },
      updateAssessment: (state, action) => {
        const updatedAssessmentIndex = state.assessments.findIndex(assessment => assessment.id === action.payload.id);
        if (updatedAssessmentIndex !== -1) {
          state.assessments[updatedAssessmentIndex] = action.payload;
        }
      },
    },
  });
  export const { setAssessments, addAssessment, updateAssessment } = assessmentSlice.actions;
  export default assessmentSlice.reducer;