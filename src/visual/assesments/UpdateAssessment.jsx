import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from '../../Theme';

import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const UpdateAssessmentForm = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [id, setId] = useState("");
    const [cid, setCid] = useState("");
    const [title, setTitle] = useState("");
    const [testurl, setTestUrl] = useState("");
    const [creationdate, setCreationDate] = useState("");
    const [expirydate, setExpiryDate] = useState("");
    const [evaluation, setEvaluation] = useState("");
    const [remark, setRemark] = useState("");


  
    const params = useParams();
    const navigate = useNavigate();

    const isDesktop = useMediaQuery("(min-width:600px)");


    useEffect(() => {
        getData();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
    
      const getData = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:5000/assessments/${params.id}`)
        result = await result.json()
        console.log(result)
        setId(result.id)
        setCid(result.cid)
        setTitle(result.title)
        setTestUrl(result.testurl)
        setCreationDate(result.creationdate)
        setExpiryDate(result.expirydate)
        setEvaluation(result.evaluation)
        setRemark(result.remark)
      }

    const handleFormSubmit = async () => {
        let result = await fetch(`http://localhost:5000/assessments/${params.id}`, {
          method: 'put',
          body: JSON.stringify({ id, cid, title, testurl, creationdate,expirydate,evaluation,remark }),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        result = await result.json()
        console.log(result)
        navigate("/assesment")
    
      }

    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title=" Update Assessment Form" subtitle=" Applicant Assessment Update" />
          
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
                        onChange={(e) => setId(e.target.value)}                       
                         value={id}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CandidateId"
                        onChange={(e) => setCid(e.target.value)}                       
                        value={cid}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Title"
                        onChange={(e) => setTitle(e.target.value)}                       
                        value={title}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Test URL"
                        onChange={(e) => setTestUrl(e.target.value)}                       
                        value={testurl}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CreationDate"
                        onChange={(e) => setCreationDate(e.target.value)}                       
                        value={creationdate}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ExpireDate"
                        onChange={(e) => setExpiryDate(e.target.value)}                       
                        value={expirydate}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Evaluation"
                        onChange={(e) => setEvaluation(e.target.value)}                       
                        value={evaluation}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Remark"
                        onChange={(e) => setRemark(e.target.value)}                       
                        value={remark}
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

export default UpdateAssessmentForm;