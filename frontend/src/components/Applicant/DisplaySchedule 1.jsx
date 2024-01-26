// import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import NavbarA from "./NavbarA";
import axios from 'axios'

const DisplaySchedule = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  // useEffect(() => {
  //   // Fetch events from a JSON file or API endpoint
  //   fetch("src/components/Applicant/fakeSchedule.json")
  //     .then((response) => response.json())
  //     .then((data) => setEvents(data))
  //     .catch((error) => console.error("Error fetching events:", error));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tournamentResponse = await axios.get('http://localhost:3001/getTournaments');
        const tournaments = tournamentResponse.data;
  
        const matchPromises = tournaments.map(async (tournament) => {
          const responseMatch = await axios.get('http://localhost:3001/getMatches/' + tournament._id);
          const matches = responseMatch.data.map(match => ({
            tournament: tournament.tournamentName,
            date: match.MatchDate, 
            matchname: match.MatchName 
          }));
            return matches;
        });
  
        const filteredMatchPromises = matchPromises.filter(Boolean);
        const matchResults = await Promise.all(filteredMatchPromises);
  
        const events = matchResults.flat();
        setEvents(events);
        console.log(matchResults);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchData();
  }, []);

  const eventDidMount = async (info) => {
    const { event } = info;
    setCurrentEvent(event);
    if (event && event.extendedProps) {
      // console.log(event.extendedProps.tournament)
      // const startString =
      //   event.start.toLocaleString && event.start.toLocaleString();
      // const endString = event.end.toLocaleString && event.end.toLocaleString();
      const titleElement = info.el.querySelector('.fc-event-title');
      titleElement.innerHTML = `${event.extendedProps.tournament} - ${event.extendedProps.matchname}`;

      const popover = document.createElement("div");
      popover.className = "custom-popover";
      // popover.innerHTML = `
      //   <p>${event.title}</p>
      //   // <p>${startString}</p>
      //   <p>${endString}</p>
      // `;
      popover.innerHTML = `
        <p>${event.extendedProps.tournament} ${event.extendedProps.matchname}</p>
      `;

      info.el.appendChild(popover);

      // Set the initial display to 'none'
      popover.style.display = "none";

      // Event listener for showing popover on hover
      info.el.addEventListener("mouseenter", () => {
        popover.style.display = "block";
      });

      // Event listener for hiding popover when not hovering
      info.el.addEventListener("mouseleave", () => {
        popover.style.display = "none";
      });
    }
  };
  const renderCustomHeaderCenter = () => {
    if (currentEvent && currentEvent.extendedProps) {
      const tournament = currentEvent.extendedProps.tournament;
      const matchname = currentEvent.extendedProps.matchname;
      return (
        {tournament} - {matchname}
      );
    } else {
      return null;
    }
  };
  
  return (
    <div>
      <NavbarA />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: renderCustomHeaderCenter(),
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        eventDidMount={eventDidMount}
      />
    </div>
  );
};

export default DisplaySchedule;
