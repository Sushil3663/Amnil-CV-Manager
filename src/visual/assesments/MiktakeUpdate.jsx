import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from '../../Theme';
// import { Formik } from "formik";
// import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/Header";
import {  fetchAssessmentById } from "../../api/Api";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { updateAssessment as updateAssessmentAction } from "../../redux/assessmentSlice";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const UpdateAssessmentForm = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id: assessmentId } = useParams();
    console.log(assessmentId)
    const navigate = useNavigate();

    // const dispatch = useDispatch();
    const [assessmentData, setAssessmentData] = useState({
        id: "",
        cid: "",
        title: "",
        testurl: "",
        creationdate: "",
        expirydate: "",
        evaluation: "",
        remark: "",
    });
    console.log(assessmentData)

    useEffect(() => {
        const fetchAssessmentData = async () => {
            try {
                const data = await fetchAssessmentById(assessmentId);
                console.log(data)


                setAssessmentData(data);
            } catch (error) {
                console.error('Error fetching assessment data:', error);
            }
        };

        fetchAssessmentData();
    }, [assessmentId]);


    const isDesktop = useMediaQuery("(min-width:600px)");




    // const handleFormSubmit = async () => {
    //     try {
    //         await updateAssessment(assessmentId, assessmentData);
    //         // dispatch(updateAssessmentAction(values));
    //         navigate('/assessment');
    //     } catch (error) {
    //         console.error('Error updating assessment:', error);
    //     }
    // };

    const handleFormSubmit = async () => {
        try {
            let result = await fetch(`http://localhost:5000/assessments/${assessmentId}`, {
                method: 'put',
                body: JSON.stringify(assessmentData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            result = await result.json();
            console.log(result);
            navigate("/assessment");
        } catch (error) {
            console.error('Error updating assessment:', error);
        }
    };
    



    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title=" Update Assessment Form" subtitle=" Applicant Assessment Update" />
            <form onSubmit={handleFormSubmit}>
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
                        onChange={(e) => setAssessmentData({ ...assessmentData, id: e.target.value })}
                        value={assessmentData.id}
                        name="id"
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CandidateId"
                        onChange={(e) => setAssessmentData({ ...assessmentData, cid: e.target.value })}
                        value={assessmentData.cid}
                        name="cid"

                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Title"
                        onChange={(e) => setAssessmentData({ ...assessmentData, title: e.target.value })} value={assessmentData.title}
                        name="title"
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Test URL"
                        onChange={(e) => setAssessmentData({ ...assessmentData, testurl: e.target.value })} value={assessmentData.testurl}
                        name="testurl"
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CreationDate"
                        onChange={(e) => setAssessmentData({ ...assessmentData, creationdate: e.target.value })}
                        value={assessmentData.creationdate}
                        name="creationdate"

                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ExpireDate"
                        onChange={(e) => setAssessmentData({ ...assessmentData, expirydate: e.target.value })} 
                        value={assessmentData.expirydate}
                        name="expirydate"

                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Evaluation"
                        onChange={(e) => setAssessmentData({ ...assessmentData, evaluation: e.target.value })}
                        value={assessmentData.evaluation}
                        name="evaluation"

                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Remark"
                        onChange={(e) => setAssessmentData({ ...assessmentData, remark: e.target.value })}
                        value={assessmentData.remark}
                        name="remark"

                        sx={{ gridColumn: "span 2" }}
                    />




                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">

                        Update
                    </Button>
                </Box>
            </form>


            {/* <Formik
                onSubmit={handleFormSubmit}
                initialValues={assessmentData}
                validationSchema={checkoutSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
                    console.log("Form values:", values); // Debug form values
                    return (
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
                                value={values.remark}
                                name="remark"
                                error={!!touched.remark && !!errors.remark}
                                helperText={touched.remark && errors.remark}
                                sx={{ gridColumn: "span 2" }}
                            />




                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
        
                            Update
                            </Button>
                        </Box>
                    </form>
                )}}
            </Formik> */}
        </Box>
    );
};


// const checkoutSchema = yup.object().shape({
//     id: yup.string().required("required"),
//     cid: yup.string().required("required"),
//     title: yup.string().required("required"),
//     testurl: yup.string().required("required"),
//     creationdate: yup.string().required("required"),
//     expirydate: yup.string().required("required"),
//     evaluation: yup.string().required("required"),
//     remark: yup.string().required("required"),



// });
// const initialValues = {

//     id: "",
//     cid: "",
//     title: "",
//     testurl: "",
//     creationdate: "",
//     expirydate: "",
//     evaluation: "",
//     remark: "",


// };


export default UpdateAssessmentForm;