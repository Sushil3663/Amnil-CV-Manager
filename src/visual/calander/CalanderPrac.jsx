import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../Theme";
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal'; 
import { formatDate } from "./FormateDate";
Modal.setAppElement('#root'); // Setting the root element for accessibility

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const unique_id = uuid();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // State for modal content

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

        calendarApi.addEvent(newEventData);
        closeModal(); // Close the modal after adding the event
      }
    };

    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    // Render the modal content with form elements
    const modalContent = (
      <div>
        <h2>Add Event</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Event Title:
            <input type="text" name="title" />
          </label>
          <label>
            Interviewer's Name:
            <input type="text" name="interviewerName" />
          </label>
          <label>
            Interviewer's Email:
            <input type="email" name="interviewerEmail" />
          </label>
          <label>
            Interview Type:
            <select name="interviewType">
              <option value="HRAssessment">HRAssessment</option>
              <option value="TechnicalAssessment">TechnicalAssessment</option>
              <option value="NegotiationRound">NegotiationRound</option>
            </select>
          </label>
          <button type="submit">Add Event</button>
        </form>
      </div>
    );

    setModalContent(modalContent);
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      selected.event.remove();
    }
  };

  return (
    <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)' }}>
      <Header title="Calendar" subtitle="Set Event Dates for CV Management" />

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
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography>
                        {formatDate()}
                      </Typography>
                      <Typography>
                        {event.extendedProps.interviewType}
                      </Typography>
                      <Typography>
                        Interviewer - {event.extendedProps.interviewerName}
                      </Typography>
                    </>
                  }
                />
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
            initialEvents={[
              {
                id: "10",
                title: "Dot Net Interview",
                date: "2023-07-30",
                interviewType: "HRAssessment",
                interviewerName: "John Doe",
                interviewerEmail: "john@example.com",
              },
            ]}
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            position: 'static',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '4px',
            backgroundColor: 'white',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {modalContent}
      </Modal>
    </Box>
  );
};

export default Calendar;
