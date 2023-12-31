import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "./FormateDate";
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

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const unique_id = uuid();

  const interviewTypes = [
    "HRAssessment",
    "TechnicalAssessment",
    "NegotiationRound",
  ];


  const handleDateClick = (selected) => {
    const title = prompt("Please enter a event name");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      // const interviewType = prompt("Please enter the interview type (HRAssessment/TechnicalAssessment/NegotiationRound):");


      const interviewerName = prompt("Please enter the interviewer's name:");
      const interviewerEmail = prompt("Please enter the interviewer's email:");

      calendarApi.addEvent({
        id: {unique_id},
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        interviewerName,
        interviewerEmail,
      });
      const interviewType = prompt("Please enter the interview type (HRAssessment/TechnicalAssessment/NegotiationRound):");

    //   if (interviewTypes.includes(interviewType)) {
    //     newEventData.interviewType = interviewType;
    //   }

    //   calendarApi.addEvent(newEventData);
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >
    <Header title="Calendar" subtitle="Set Event Dates for CV Management" />

      <Box display="flex" justifyContent="space-between">

        {/* Calander Sidebar */}
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
                      {event.interviewType} - {event.interviewerName}
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
                interviewerName: "Nitesh Dahal",
                interviewerEmail: "DahalNitesh12@gmail.com",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;