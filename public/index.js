

// document.addEventListener("DOMContentLoaded", async function () {
//   var calendarEl = document.getElementById("calendar");
//   let response = await axios("/event")
//   console.log(response.data)
//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: "dayGridMonth",
//     navLinks: true,
//     headerToolbar: {
//       left: "prev, next today",
//       center: "addEventButton",
//       right: "title",
//     },
//     events: [
//       {
//         title: response.data[0].event_name, //eventName//
//         start: "2022-08-30", //event_start//
//         end: "2022-08-31",
//       },
//     ],
//     customButtons: {
//       addEventButton: {
//         text: "add event...",
//         click: function () {
//           var dateStr = prompt("Enter a date in YYYY-MM-DD format");
//           var date = new Date(dateStr + "T00:00:00"); // will be in local time
//           if (!isNaN(date.valueOf())) {
//             // valid?
//             calendar.addEvent({
//               title: "dynamic event",
//               start: date,
//               allDay: true,
//             });
//             alert("Great. Now, update your database...");
//           } else {
//             alert("Invalid date.");
//           }
//         },
//       },
//     },
//     selectable: true,
//     selectHelper: true,
//     editable: true,
//   });
//   calendar.render();
// });




