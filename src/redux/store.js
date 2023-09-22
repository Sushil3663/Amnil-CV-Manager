import { configureStore,combineReducers  } from '@reduxjs/toolkit';
import assessmentReducer from './assessmentSlice';
import applicantReducer from "./applicantSlice"
import checkedApplicantReducer from "./checkedApplicantSlice"
import blacklistReasonReducer from './blacklistSlice';

const rootReducer = combineReducers({
  assessments: assessmentReducer,
  applicants: applicantReducer,
  checkedApplicants: checkedApplicantReducer,
  blacklistReasons: blacklistReasonReducer,

});

const store = configureStore({
  reducer: rootReducer,
});

  export default store;