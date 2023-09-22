import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Logo from '../../assets/Amnil Logo.png';
import { formatDate } from '../calander/FormateDate';
import { Box } from '@mui/material';


const RejectTemplate = () => {

    const editor = useRef(null);



    const [content, setContent] = useState('');

    useEffect(() => {
        
        const savedValues = JSON.parse(localStorage.getItem('rejectLetterValues'));

        const savedContent = localStorage.getItem('rejectLetterContent') || `
            
            <p>Amnil Technology</p>

            <p>Date: ${formatDate()}</p>

            <p>Dear ${savedValues ? savedValues.name : 'Applicant'},</p>

            <p>Subject: Rejection of Application for the Position of ${savedValues ? savedValues.technology : 'Position'}</p>
            
            <p>We would like to thank you for your interest in the position of ${savedValues ? savedValues.position : 'Position'} at 
            Amnil Technology.</p>
          
            <p>After careful consideration of your qualifications, skills, and experience, we regret to inform you that 
            we have chosen to move forward with other candidates whose profiles more closely match our requirements for 
            the position.</p>

            <p>We appreciate the time and effort you put into the application process and wish you the best in 
            your future endeavors.</p>

            <p>Thank you again for considering Amnil Technology as a potential employer.</p>

            <p>Best regards,</p>

            <p>Amnil Technology</p>

            <img src="${Logo}" alt="Amnil Technology Logo" width="200" height="60" />
        `;
        setContent(savedContent);
    }, []);

    useEffect(() => {
      
        localStorage.setItem('rejectLetterContent', content);
    }, [content]);

    return (
        <Box>
            <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                onChange={(newContent) => setContent(newContent)}
                onBlur={(newContent) => setContent(newContent)}
            />
        </Box>
    );
};

export default RejectTemplate;
