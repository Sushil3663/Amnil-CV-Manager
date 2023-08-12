// import React, { useRef, useState, useEffect } from 'react';
// import JoditEditor from 'jodit-react';
// import Logo from '../../assets/Amnil Logo.png';
// import { formatDate } from '../calander/FormateDate';
// import { Box } from '@mui/material';
// import { tokens } from "../../Theme";
// import { useTheme } from '@mui/material';

// const OfferLetterEditor = () => {
//     const editor = useRef(null);

//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     const [content, setContent] = useState(() => {
//         // Load content from local storage or set default content
//         const savedContent = localStorage.getItem('offerLetterContent');
//         return savedContent || `
//             <h2> Offer Letter</h2>

//             <P>Amnil Technology</P>

//             <p>Date: ${formatDate()}</p>

//             <p>Dear [Name],</p>

//             <p>Subject: Offer of Employment for the Position of [Position]</p>

//             <p>We are pleased to extend an offer of employment to you for the position of [technology] at Amnil Technology.
//             We were highly impressed with your qualifications, skills, and experience, and after careful consideration, 
//             we believe that you will be a valuable addition to our team.</p>
          
//             <p> We look forward to having you join our team and contributing your expertise to Amnil
//             Technology. If you have any questions or require further clarification, please do not hesitate to contact us. 
//              I hope you  still have either this Email: [email] or Phone: [phone]. your address i.e [address] is near to Amnil Technology. 
//              So that you feel easy on this journey with Amnil Technology.</p>

           
          
//             <p>We look forward to having you join our team and contributing your expertise to Amnil Technology.
             
//             <p>Once again, congratulations on your appointment, and we eagerly await your positive response.</p>

//             <p>Best regards,</p>

//             <p>Amnil Technology</p>

//             <img src="${Logo}" alt="Amnil Technology Logo" width="200" height="60" />
//         `;
//     });

//     useEffect(() => {
//         // Save content to local storage whenever it changes
//         localStorage.setItem('offerLetterContent', content);
//     }, [content]);

//     return (
//         <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)', }}>
//             <JoditEditor
//                 ref={editor}
//                 value={content}
//                 tabIndex={1}
//                 onChange={(newContent) => setContent(newContent)}
//                 onBlur={(newContent) => setContent(newContent)}
//             />
//         </Box>
//     );
// };

// export default OfferLetterEditor;

// import React, { useRef, useState } from 'react';
// import JoditEditor from 'jodit-react';
// import Logo from '../../assets/Amnil Logo.png'
// import { formatDate } from '../calander/FormateDate';
// import { Box } from '@mui/material';
// import { tokens } from "../../Theme";

// import { useTheme } from '@mui/material';
// import { useEffect } from 'react';

// const OfferLetterEditor = () => {

//     const editor = useRef(null);

//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     const [content, setContent] = useState(() => {
//         // Load content from local storage or set default content
//         const savedValues = JSON.parse(localStorage.getItem('offerLetterValues'));

//         const savedContent = localStorage.getItem('offerLetterContent');
//         return savedContent || `
//             <h3> Offer Letter</h3>
            
//             <P>Amnil Technology</P>

//             <p>Date: ${formatDate()}</p>

//             <p>Dear  ${savedValues ? savedValues.name : ['name']},</p>

//             <p>Subject: Offer of Employment for the Position of ${savedValues ? savedValues.technology : ['position']}</p>
            
//             <p>We are pleased to extend an offer of employment to you for the position of ${savedValues ? savedValues.technology : ['technology']} at Amnil Technology.
//              We were highly impressed with your qualifications, skills, and experience, and after careful consideration, 
//             we believe that you will be a valuable addition to our team.</p>
          
//             <p> We look forward to having you join our team and contributing your expertise to Amnil
//             Technology. If you have any questions or require further clarification, please do not hesitate to contact us. 
//              I hope you  still have either this Email: ${savedValues ? savedValues.email : ['email']}  or
//               Phone: ${savedValues ? savedValues.phone : ['phone']} . your address i.e ${savedValues ? savedValues.address : ['address']} is
//                 near to Amnil Technology. 
//              So that you feel easy on this journey with Amnil Technology.</p>
             
//             <p>Once again, congratulations on your appointment, and we eagerly await your positive response.</p>

//             <p>Best regards,</p>

//             <p>Amnil Technology</p>

//             <img src="${Logo}" alt="Amnil Technology Logo" width="200" height="60" />
//         `;
//     });

//     useEffect(() => {
//         // Save content to local storage whenever it changes
//         localStorage.setItem('offerLetterContent', content);
//     }, [content]);

//     return (
//         <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)', }}>
//             <JoditEditor
//                 ref={editor}
//                 value={content}
//                 tabIndex={1}
//                 onChange={(newContent) => setContent(newContent)}
//                 onBlur={(newContent) => setContent(newContent)}
//             />
//         </Box>
//     );
// };

// export default OfferLetterEditor;
