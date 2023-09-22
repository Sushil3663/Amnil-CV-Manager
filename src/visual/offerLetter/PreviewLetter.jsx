import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from '../../Theme';

import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { createCandidateStatus } from "../../api/Api";

const OfferedLetter = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        reference: '',
        technology: '',
        level: '',
        salary: '',
        experience: '',
    });



    const { id } = useParams();
    const navigate = useNavigate();

    const isDesktop = useMediaQuery("(min-width:600px)");




    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/applicants/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            const status = {
                id: formData.id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                reference: formData.reference,
                technology: formData.technology,
                level: formData.level,
                salary: formData.salary,
                experience: formData.experience,
            };

            const response = await createCandidateStatus(status);

            if (response) {
                console.log('Candidate status created:', response);
                navigate("/status");
            } else {
                console.error('Failed to create candidate status:', response);
            }
        } catch (error) {
            console.error('Error creating candidate status:', error);
        }
    };



    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)' }} >

            <Header title="Offered Letter Form" subtitle="Create Offer Letter From Form" />

            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isDesktop ? undefined : "span 6" },
                }}
            >
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Id"
                    name="id"
                    onChange={handleInputChange}
                    value={formData.id}
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    name="name"
                    onChange={handleInputChange}
                    value={formData.name}
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Phone"
                    name="phone"
                    onChange={handleInputChange}
                    value={formData.phone}
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Reference"
                    name="reference"
                    onChange={handleInputChange}
                    value={formData.reference}
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Technology"
                    name="technology"
                    onChange={handleInputChange}
                    value={formData.technology}
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Level"
                    name="level"
                    onChange={handleInputChange}
                    value={formData.level}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Salary"
                    name="salary"
                    onChange={handleInputChange}
                    value={formData.salary}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Experience"
                    name="experience"
                    onChange={handleInputChange}
                    value={formData.experience}
                    sx={{ gridColumn: "span 2" }}
                />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit}>

                    CreateStatus
                </Button>
            </Box>

        </Box>
    )
}



export default OfferedLetter;
