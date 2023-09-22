import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from '../../Theme';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';

import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";


const OfferLetter = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate()

    


    const isDesktop = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        localStorage.setItem('offerLetterValues', JSON.stringify(values));
        navigate("/template/offer")
    };
   

    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)' }} >

            <Header title="Offer Letter Form" subtitle=" Applicant Offer Letter for Job Placement" />
            <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
                gap={2}
                mt={2}
                mb={2}
                mr={"10px"}
            >
                
                    <Link
                        to="/rejectform"
                    >
                        <Button style={{
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}>Reject Form<CancelPresentationOutlinedIcon /></Button>

                    </Link>
            
            </Box>


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
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
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
                                sx={{ gridColumn: "span 4" }}
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
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 4" }}
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
                                sx={{ gridColumn: "span 4" }}
                            />




                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                OfferLetter
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
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup
        .string()
        .matches(ValidateNumber, "Phone number is not valid")
        .required("required"),
    address: yup.string().required("required"),
    technology: yup.string().required("required"),

});
const initialValues = {

    name: "",
    email: "",
    phone: "",
    address: "",
    technology: "",


};

export default OfferLetter;
