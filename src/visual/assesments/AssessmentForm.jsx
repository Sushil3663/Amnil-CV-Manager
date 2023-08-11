import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from '../../Theme';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/Header";
import { createAssessment  } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addAssessment } from "../../redux/assessmentSlice";
// import { updateAssessment as updateAssessmentAction } from "../../redux/assessmentSlice";

const AssessmentForm = () => {
    // console.log(editingAssessment);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const isDesktop = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async(values) => {
        try{
            
                const response = await createAssessment(values);
                dispatch(addAssessment(response))
          
            navigate("/assesment");
        }
        catch(error){
            console.error('Error creating assessment:', error);

        }
    
        
    };

   

    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title="Assessment Form" subtitle=" Applicant Assessment Form for Job Placement" />


            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isDesktop ? undefined : "span 4" },
                            }}
                        >
                         <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Id"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.id}

                                // defaultValue={editingAssessment.id}
                                name="id"
                                error={!!touched.id && !!errors.id}
                                helperText={touched.id && errors.id}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="CandidateId"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // defaultValue={editingAssessment.cid}
                                value={values.cid}
                                name="cid"
                                error={!!touched.cid && !!errors.cid}
                                helperText={touched.cid && errors.cid}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Title"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.title}
                                // defaultValue={editingAssessment.title}
                                name="title"
                                error={!!touched.title && !!errors.title}
                                helperText={touched.title && errors.title}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Test URL"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.testurl}
                                // defaultValue={editingAssessment.testurl}
                                name="testurl"
                                error={!!touched.testurl && !!errors.testurl}
                                helperText={touched.testurl && errors.testurl}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="CreationDate"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // defaultValue={editingAssessment.creationdate}
                                value={values.creationdate}
                                name="creationdate"
                                error={!!touched.creationdate && !!errors.creationdate}
                                helperText={touched.creationdate && errors.creationdate}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="ExpireDate"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // defaultValue={editingAssessment.expirydate}
                                value={values.expirydate}
                                name="expirydate"
                                error={!!touched.expirydate && !!errors.expirydate}
                                helperText={touched.expirydate && errors.expirydate}
                                sx={{ gridColumn: "span 2" }}
                            />
                            
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Evaluation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // defaultValue={editingAssessment.evaluation}
                                value={values.evaluation}
                                name="evaluation"
                                error={!!touched.evaluation && !!errors.evaluation}
                                helperText={touched.evaluation && errors.evaluation}
                                sx={{ gridColumn: "span 2" }}
                            />
                               <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Remark"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // defaultValue={editingAssessment.remark}
                                value={values.remark}
                                name="remark"
                                error={!!touched.remark && !!errors.remark}
                                helperText={touched.remark && errors.remark}
                                sx={{ gridColumn: "span 2" }}
                            />




                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                            {/* {editingAssessment ? 'Update' : 'Create'} */}
                            Create
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};


const checkoutSchema = yup.object().shape({
    id: yup.string().required("required"),
    cid: yup.string().required("required"),
    title: yup.string().required("required"),
    testurl: yup.string().required("required"),
    creationdate: yup.string().required("required"),
    expirydate: yup.string().required("required"),
    evaluation: yup.string().required("required"),
    remark: yup.string().required("required"),



});
const initialValues = {

    id: "",
    cid: "",
    title: "",
    testurl: "",
    creationdate: "",
    expirydate: "",
    evaluation: "",
    remark: "",


};


export default AssessmentForm;