import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import NavbarA from "./NavbarA";

const DisplaySchedule = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from a JSON file or API endpoint
    fetch("src/components/Applicant/fakeSchedule.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const eventDidMount = (info) => {
    const { event } = info;

    if (event && event.start && event.end) {
      const startString =
        event.start.toLocaleString && event.start.toLocaleString();
      const endString = event.end.toLocaleString && event.end.toLocaleString();

      const popover = document.createElement("div");
      popover.className = "custom-popover";
      popover.innerHTML = `
        <p>${event.title}</p>
        <p>${startString}</p>
        <p>${endString}</p>
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

  return (
    <div>
      <NavbarA />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
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
