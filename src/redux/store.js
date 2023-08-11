import { configureStore,combineReducers  } from '@reduxjs/toolkit';
import assessmentReducer from './assessmentSlice';
import applicantReducer from "./applicantSlice"
import checkedApplicantReducer from "./checkedApplicantSlice"


const rootReducer = combineReducers({
  assessments: assessmentReducer,
  applicants: applicantReducer,
  checkedApplicants: checkedApplicantReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

  export default store;