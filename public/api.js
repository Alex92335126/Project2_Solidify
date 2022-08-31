let eventList = document.getElementById("event-data")
let eventBtn = document.getElementById("event-button")
const Calendar = tui.Calendar;
const container = document.getElementById('calendar');
const options = {
  defaultView: 'month',
  timezone: {
    zones: [
      {
        timezoneName: 'Asia/Hong_Kong',
        displayLabel: 'Hong Kong',
      },
    ],
  },
  calendars: [
    {
      id: 'cal1',
      name: 'Personal',
      backgroundColor: '#03bd9e',
    },
    {
      id: 'cal2',
      name: 'Work',
      backgroundColor: '#00a9ff',
    },
  ],
};

const calendar = new Calendar(container, options);

function showEvent() {
    if (eventList.style.display == "none") {
        eventList.style.display = "block";
        eventBtn.innerHTML = "Hide"

    } else {
        eventList.style.display = "none";
        eventBtn.innerHTML = "See Event"
    }
}

async function getData () {
    let res = await axios.get("https://localhost:3000/event")
    console.log(res.data)
    for(item of res.data) {
        eventList.innerHTML += `
            <div class="event-data" style= "text-align: left;" >
                <div class="text-capitalize">${"Event Name: "+item.event_name}</div>
                <div>${"Description: " + item.description}</div>
                <div>${"Event Type: " + item.event_type}</div>
                <div>${"Event Start: " + item.event_start}</div>
                <hr>
            </div>
        `
    }
}
getData()