import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../Theme";
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { formatDate } from "./FormateDate";
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

Modal.setAppElement('#root'); // Setting the root element for accessibility

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [currentEvents, setCurrentEvents] = useState([]);
  const unique_id = uuid();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // State for modal content

  const [currentEvents, setCurrentEvents] = useState(
    JSON.parse(localStorage.getItem('events') || '[]')
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   const storedEvents = localStorage.getItem('calendarEvents');
  //   if (storedEvents) {
  //     setCurrentEvents(JSON.parse(storedEvents));
  //     setIsInitialized(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('events', JSON.stringify(currentEvents));
  // }, [currentEvents])


  const handleDateClick = (selected) => {
    openModal();

    const handleFormSubmit = (event) => {

      event.preventDefault();

      const title = event.target.title.value;
      const interviewerName = event.target.interviewerName.value;
      const interviewerEmail = event.target.interviewerEmail.value;
      const interviewType = event.target.interviewType.value;

      if (title) {
        const newEventData = {
          id: unique_id,
          title,
          start: selected.startStr,
          end: selected.endStr,
          allDay: selected.allDay,
          interviewType,
          interviewerName,
          interviewerEmail,
        };

        const updatedEvents = [...currentEvents, newEventData];
        localStorage.setItem('events', JSON.stringify(updatedEvents));

        calendarApi.addEvent(newEventData);
        closeModal(); // Close the modal after adding the event
      }

    };

    const calendarApi = selected.view.calendar;
    calendarApi.unselect();


    const modalContent = (
      <Box height={"40vh"}>
        <Typography variant="h4">Add Event</Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Title"
                name="title"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Interviewer's Name"
                name="interviewerName"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Interviewer's Email"
                name="interviewerEmail"
                type="email"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={['HRAssessment', 'TechnicalAssessment', 'NegotiationRound']}
                renderInput={(params) => (
                  <TextField {...params} label="Interview Type" name="interviewType" variant="outlined" fullWidth />
                )}
              />
            </Grid>
          </Grid>
          <Button type="submit" style={{
            background: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginTop: '1px'
          }}>
            Add Event
          </Button>
        </form>
      </Box>
    );

    setModalContent(modalContent);
  };
  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      selected.event.remove();
      const updatedEvents = currentEvents.filter(event => event.id !== selected.event.id);
      setCurrentEvents(updatedEvents); // Update state
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    }
  };

  const handleClickForm = () => {
    navigate("/calanderlist")

  }

  return (
    <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)' }}>
      <Header title="Calendar" subtitle="Set Event Dates for CV Management" />

      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        gap={2}
        mt={1}
        mb={2}
        mr={"10px"}
      >
        <Button
          onClick={handleClickForm}
          style={{
            background: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            paddingLeft: '4px'
          }}

        >
          View <CreateNewFolderOutlinedIcon style={{ marginRight: '5px' }} />
        </Button>

      </Box>

      <Box display="flex" justifyContent="space-between">

        {/* Calendar Sidebar */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <Typography>
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <div>
                        <Typography>
                          {formatDate()}
                        </Typography>
                        {/* <Typography>
                          {event.interviewType}
                        </Typography>
                        <Typography>
                          Interviewer - {event.interviewerName}
                        </Typography> */}
                      </div>
                    }
                  />
                </Typography>
              </ListItem>

            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">

          <FullCalendar
            height="71vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={currentEvents.map((event) => ({
              id: event.id,
              title: event.title,

              date: event.start,
              // interviewType: event.interviewType,
              // interviewerName: event.interviewerName,
              // interviewerEmail: event.interviewerEmail,
            }))}
          />

        </Box>
      </Box>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: "200px",

            backgroundColor: 'rgba(0, 0.5, 0, 0.5)',
            zIndex: 500,
          },
          content: {
            position: 'static',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '4px',
            backgroundColor: colors.primary[400],
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 500,
          },
        }}
      >
        {modalContent}
      </Modal>
    </Box>
  );
};

export default Calendar;
