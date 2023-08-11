import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from '../../Theme';

import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const UpdateFrom = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [reference, setReference] = useState("");
    const [technology, setTechnology] = useState("");
    const [level, setLevel] = useState("");
    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");


  
    const params = useParams();
    const navigate = useNavigate();

    const isDesktop = useMediaQuery("(min-width:600px)");


    useEffect(() => {
        getData();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
    
      const getData = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:5000/applicants/${params.id}`)
        result = await result.json()
        console.log(result)
        setId(result.id)
        setName(result.name)
        setEmail(result.email)
        setPhone(result.phone)
        setReference(result.reference)
        setTechnology(result.technology)
        setLevel(result.level)
        setSalary(result.salary)
        setExperience(result.experience)
      }
        

    const handleFormSubmit = async () => {
        let result = await fetch(`http://localhost:5000/applicants/${params.id}`, {
          method: 'put',
          body: JSON.stringify({ id, name, email, phone, reference,technology,level,salary,experience }),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        result = await result.json()
        console.log(result)
        navigate("/applicants")
    
      }

    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title=" Update Assessment Form" subtitle=" Applicant Assessment Update" />
          
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
                        onChange={(e) => setId(e.target.value)}                       
                        value={id}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}                       
                        value={name}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}                       
                        value={email}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Phone"
                        onChange={(e) => setPhone(e.target.value)}                       
                        value={phone}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Reference"
                        onChange={(e) => setReference(e.target.value)}                       
                        value={reference}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Technology"
                        onChange={(e) => setTechnology(e.target.value)}                       
                        value={technology}
                        sx={{ gridColumn: "span 2" }}
                    /> 

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Level"
                        onChange={(e) => setLevel(e.target.value)}                       
                        value={level}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Salary"
                        onChange={(e) => setSalary(e.target.value)}                       
                        value={salary}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Experience"
                        onChange={(e) => setExperience(e.target.value)}                       
                        value={experience}
                        sx={{ gridColumn: "span 2" }}
                    />

                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit}>

                        Update
                    </Button>
                </Box>

        </Box>
    )
}

export default UpdateFrom;