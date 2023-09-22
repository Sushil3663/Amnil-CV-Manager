import { colorContext, useMode } from "./Theme";
import { ThemeProvider } from "@mui/material";
import TopBar from "./visual/global/TopBar";
import SideBar from "./visual/global/SideBar";
import { Routes, Route } from 'react-router-dom';
import Dashboards from './visual/dashboard/Dashboards.jsx'
import Applicants from "./visual/applicants/Applicants";
import Candidate from "./visual/contacts/Contact";
import CreateForm from "./visual/createform/CreateForm";
import Calander from "./visual/calander/Calander";
import OfferLetter from "./visual/offerLetter/OfferLetter";
import Bar from "./visual/barChart/Bar";
import Pie from "./visual/pieChart/Pie";
import Line from "./visual/lineChart/Line";
import ApplicantDetails from "./visual/applicants/ApplicantsDetail";
import CandidateDetail from "./visual/contacts/CandidateDetail";
import Letter from "./visual/offerLetter/Letter";
import JobDomain from "./visual/jobs/JobDomain";
import JobLevel from "./visual/jobs/JobLevel";
import JobApplicationStatus from "./visual/jobs/JobApplicationStatus";
import JobPosition from "./visual/jobs/JobPosition";
import JobDesc from "./visual/jobs/JobDesc";
import Assesment from "./visual/assesments/Assesment";
import AssessmentForm from "./visual/assesments/AssessmentForm";
import UpdateAssessmentForm from "./visual/assesments/UpdateAssessment";
import UpdateFrom from "./visual/applicants/UpdateForm";
import TemplateLetter from "./visual/lettertemplate/TemplateLetter";
import RejectTemplate from "./visual/lettertemplate/RejectTemplate";
import Template from "./visual/lettertemplate/Template";
import PreviewLetter from "./visual/offerLetter/PreviewLetter";
import CalanderList from "./visual/calander/CalanderList";
import BlackListApplicant from "./visual/applicants/BlackListApplicant";
import BlackList from "./visual/applicants/BlackList";
import { useAuth0 } from "@auth0/auth0-react";
import Auth0ProviderWithHistory from "./Auth0ProviderWithHistory";
import LoginButton from "./visual/global/Login";
import DotNetTemplate from "./visual/lettertemplate/DotNetTemplate";
import ReactTemplate from "./visual/lettertemplate/ReactTemplate";
import QATemplate from "./visual/lettertemplate/QATemplate";
import HRTemplate from "./visual/lettertemplate/HRTemplate";

function App() {
  const { isAuthenticated } = useAuth0();
  const [theme, colorMode] = useMode();

  return (

    <colorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {isAuthenticated ? <div className="app">



          <SideBar />

          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboards />} />
              {/* <Route path="/" element={isAuthenticated ? <Dashboards /> : <LoginButton />} /> */}

              <Route path="/applicants" element={<Applicants />} />
              <Route path="/applicants/blacklist" element={<BlackList />} />
              <Route path="/applicants/list/:id" element={<BlackListApplicant />} />

              <Route path="/applicants/:id" element={<ApplicantDetails />} />
              <Route path="/updateapplicant/:id" element={<UpdateFrom />} />


              <Route path="/contact" element={<Candidate />} />
              <Route path="/contact/:id" element={<CandidateDetail />} />

              <Route path="/form" element={<CreateForm />} />

              <Route path="/assesment" element={<Assesment />} />
              <Route path="/assesmentform" element={<AssessmentForm />} />
              <Route path="/updateassessmentForm/:id" element={<UpdateAssessmentForm />} />


              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />

              <Route path="/calander" element={<Calander />} />
              <Route path="/calanderlist" element={<CalanderList />} />


              <Route path="/offer" element={<OfferLetter />} />
              <Route path="/offerform/:id" element={<PreviewLetter />} />

              <Route path="/template/" element={<TemplateLetter />} >
                <Route index element={<Template />} />
                <Route path="offer" element={<Template />} />
                <Route path="reject" element={<RejectTemplate />} />
                <Route path="dotnet" element={<DotNetTemplate />} />
                <Route path="react" element={<ReactTemplate />} />
                <Route path="hr" element={<HRTemplate />} />
                <Route path="qa" element={<QATemplate />} />
              </Route>

              <Route path="/letter" element={<Letter />} />

              <Route path="/domain" element={<JobDomain />} />
              <Route path="/level" element={<JobLevel />} />
              <Route path="/status" element={<JobApplicationStatus />} />
              <Route path="/position" element={<JobPosition />} />
              <Route path="/position/:id" element={<JobDesc />} />



            </Routes>
          </main>

        </div>


          : <LoginButton />}



      </ThemeProvider>
    </colorContext.Provider>


  );
}

export default App;
