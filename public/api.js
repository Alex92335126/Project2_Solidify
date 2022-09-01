let eventList = document.getElementById("event-data");
let eventBtn = document.getElementById("event-button");
console.log(eventList);

function showEvent() {
  if (eventList.style.display == "none") {
    eventList.style.display = "block";
    eventBtn.innerHTML = "Hide";
  } else {
    eventList.style.display = "none";
    eventBtn.innerHTML = "See Event";
  }
}

async function getData() {
  let res = await axios.get("https://localhost:3000/event");
  console.log(res.data);
  for (item of res.data) {
    eventList.innerHTML += `
            <div class="event-data">
                <div class="text-capitalize">${item.event_name}</div>
                <div>${item.description}</div>
                <div>${item.event_type}</div>
                <div>${item.event_start}</div>
                <hr>
            </div>
        `;
  }
}
getData();

function callDateTime() {
  var currentDate = new Date().toDateString();
  var currentTime = new Date().toLocaleTimeString();
  document.getElementById("watch").innerHTML = `${currentDate}-${currentTime}`;
}

setInterval(function () {
  callDateTime();
}, 1000);
