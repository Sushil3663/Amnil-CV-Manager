import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
  });

  
export const fetchAssessments = async () => {
    const response = await instance.get('/assessments');
    return response.data;
  };

  export const fetchApplicants = async () => {
    const response = await instance.get('/applicants');
    return response.data;
  };

  export const createAssessment = async (assessment) => {
    const response = await instance.post('/assessments', assessment);
    return response.data;
  };

  export const createApplicant = async (applicant) => {
    const response = await instance.post('/applicants', applicant);
    return response.data;
  };



  export const deleteAssessment = async (id) => {
    const response = await instance.delete(`/assessments/${id}`);
    return response.data;
};

export const deleteApplicant = async (id) => {
  const response = await instance.delete(`/applicants/${id}`);
  return response.data;
};
// export const updateAssessment = async (id, updatedData) => {
//   const response = await instance.put(`/assessments/${id}`, updatedData);;
//   return response.data;
// };

export const fetchAssessmentById = async (id) => {
  const response = await instance.get(`/assessments/${id}`);
  return response.data;
};