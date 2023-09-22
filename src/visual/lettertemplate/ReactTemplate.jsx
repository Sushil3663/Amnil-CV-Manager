
import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Logo from '../../assets/Amnil Logo.png'
import { formatDate } from '../calander/FormateDate';
import { Box, Button } from '@mui/material';


const ReactTemplate = () => {

    const editor = useRef(null);

    const handleView = () => {
        const status = 'true';
        localStorage.setItem('ReactStatus', status);
    }


    const [content, setContent] = useState('');

    useEffect(() => {

        const savedValues = JSON.parse(localStorage.getItem('ReactTemplate'));

        const savedContent = localStorage.getItem('offerLetterContent') || `
         
            
            <P>Amnil Technology</P>

            <p>Date: ${formatDate()}</p>

            <p>Dear  ${savedValues ? savedValues.name : ['name']},</p>

            <p>Subject: Offer of Employment for the Position of ${savedValues ? savedValues.technology : ['position']}</p>
            
            <p>We are pleased to extend an offer of employment to you for the position of ${savedValues ? savedValues.technology : ['technology']} at Amnil Technology.
             We were highly impressed with your qualifications, skills, and experience, and after careful consideration, 
            we believe that you will be a valuable addition to our team.</p>
          
            <p> We look forward to having you join our team and contributing your expertise to Amnil
            Technology. If you have any questions or require further clarification, please do not hesitate to contact us. 
             I hope you  still have either this Email: ${savedValues ? savedValues.email : ['email']}  or
              Phone: ${savedValues ? savedValues.phone : ['phone']}. Welcome to this journey with Amnil Technology.</p>
             
            <p>Once again, congratulations on your appointment, and we eagerly await your positive response.</p>

            <p>Best regards,</p>

            <p>Amnil Technology</p>

            <img src="${Logo}" alt="Amnil Technology Logo" width="200" height="60" />
        `;
        setContent(savedContent);
    }, []);

    useEffect(() => {

        localStorage.setItem('offerLetterContent', content);
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
            <Box>
                <Button
                    onClick={() => handleView()}
                    style={{
                        background: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: "5px",
                    }}
                >Send Letter

                </Button>
            </Box>
        </Box>
    );
};

export default ReactTemplate;
