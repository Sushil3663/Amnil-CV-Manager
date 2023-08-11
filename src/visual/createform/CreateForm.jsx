import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from '../../Theme';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createApplicant  } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addApplicant } from "../../redux/applicantSlice";
const CreateForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const isDesktop = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async(values) => {
        try{
            
                const response = await createApplicant(values);
                dispatch(addApplicant(response))
          
            navigate("/applicants");
        }
        catch(error){
            console.error('Error creating Applicant:', error);

        }
    
        
    };

    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title="Create User" subtitle="Create a New Applicant Profile" />

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
                                "& > div": { gridColumn: isDesktop ? undefined : "span 5" },
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
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                            />
                             <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Reference"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.reference}
                                name="reference"
                                error={!!touched.reference && !!errors.reference}
                                helperText={touched.reference && errors.reference}
                                sx={{ gridColumn: "span 2" }}
                            />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Level"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.level}
                                name="level"
                                error={!!touched.level && !!errors.level}
                                helperText={touched.level && errors.level}
                                sx={{ gridColumn: "span 2" }}
                            />
                            

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Technology"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.technology}
                                name="technology"
                                error={!!touched.technology && !!errors.technology}
                                helperText={touched.technology && errors.technology}
                                sx={{ gridColumn: "span 2" }}
                           />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Salary"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.salary}
                                name="salary"
                                error={!!touched.salary && !!errors.salary}
                                helperText={touched.salary && errors.salary}
                                sx={{ gridColumn: "span 2" }}
                            />
                             <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Experience"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.experience}
                                name="experience"
                                error={!!touched.experience && !!errors.experience}
                                helperText={touched.experience && errors.experience}
                                sx={{ gridColumn: "span 4" }}
                            />
                            


                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const ValidateNumber =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    id: yup.string().required("required"),
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup
        .string()
        .matches(ValidateNumber, "Phone number is not valid")
        .required("required"),
    technology: yup.string().required("required"),
    reference: yup.string().required("required"),
    level: yup.string().required("required"),
    salary: yup.string().required("required"),
    experience: yup.string().required("required"),





});
const initialValues = {
    id: "",
    name: "",
    email: "",
    phone: "",
    technology: "",
    reference: "",
    level: "",
    salary: "",
    experience: "",


};

export default CreateForm;
