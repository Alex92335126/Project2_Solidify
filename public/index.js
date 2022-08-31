document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    navLinks: true,
    headerToolbar: {
      left: "prev, next today",
      center: "addEventButton",
      right: "title",
    },
    events: [
      {
        title: "hello testing", //eventName//
        start: "2022-08-29", //event_start//
        end: "2022-08-30",
      },
    ],
    customButtons: {
      addEventButton: {
        text: "add event...",
        click: function () {
          var dateStr = prompt("Enter a date in YYYY-MM-DD format");
          var date = new Date(dateStr + "T00:00:00"); // will be in local time
          if (!isNaN(date.valueOf())) {
            // valid?
            calendar.addEvent({
              title: "dynamic event",
              start: date,
              allDay: true,
            });
            alert("Great. Now, update your database...");
          } else {
            alert("Invalid date.");
          }
        },
      },
    },
    selectable: true,
    selectHelper: true,
    editable: true,
  });
  calendar.render();
});