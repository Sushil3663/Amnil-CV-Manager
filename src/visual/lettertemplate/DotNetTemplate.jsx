import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Logo from '../../assets/Amnil Logo.png';
import { formatDate } from '../calander/FormateDate';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DotNetTemplate = () => {
    const editor = useRef(null);
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [readOnlyMode, setReadOnlyMode] = useState(false);



    useEffect(() => {
        const savedValues = JSON.parse(localStorage.getItem('dotnetTemplate'));
        const savedContent =
            localStorage.getItem('offerLetterContent') ||
            `<p>Amnil Technology</p>
      <p>Date: ${formatDate()}</p>
      <p>Dear ${savedValues ? savedValues.name : 'name'},</p>
      <p>Subject: Offer of Employment for the Position of ${savedValues ? savedValues.technology : 'position'
            }</p>
      <p>We are pleased to extend an offer of employment to you for the position of ${savedValues ? savedValues.technology : 'technology'
            } at Amnil Technology. We were highly impressed with your qualifications, skills, and experience, and after careful consideration, we believe that you will be a valuable addition to our team.</p>
      <p>We look forward to having you join our team and contributing your expertise to Amnil
        Technology. If you have any questions or require further clarification, please do not hesitate to contact us. I hope you still have either this Email: ${savedValues ? savedValues.email : 'email'
            } or Phone: ${savedValues ? savedValues.phone : 'phone'}. Welcome to this journey with Amnil Technology.</p>
      <p>Once again, congratulations on your appointment, and we eagerly await your positive response.</p>
      <p>Best regards,</p>
      <p>Amnil Technology</p>
      <img src="${Logo}" alt="Amnil Technology Logo" width="200" height="60" />`;

        setContent(savedContent);
    }, []);

    useEffect(() => {
        localStorage.setItem('offerLetterContent', content);
    }, [content]);

    useEffect(() => {
        const status = localStorage.getItem("DotNetTemplate")
        setReadOnlyMode(status);
    }, []);

    const handleBack = () => {
        setReadOnlyMode(true);
        const status = 'true';
        localStorage.setItem('DotNetTemplate', status);

        navigate('/offer'); 
    };

    return (
        <Box>
            {
                readOnlyMode ?

                    <JoditEditor
                        value={content}
                        config={{ readonly: readOnlyMode, buttons: readOnlyMode ? [] : undefined }}
                    /> : <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onChange={(newContent) => setContent(newContent)}
                        onBlur={(newContent) => setContent(newContent)}
                        readonly={readOnlyMode}
                    />

            }
            {!readOnlyMode && (
                <Box>
                    <Button
                        onClick={() => handleBack()}
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
                            marginTop: '5px',
                        }}
                    >
                        Send Letter
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default DotNetTemplate;
