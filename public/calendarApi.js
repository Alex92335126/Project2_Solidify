let calendarEventList = document.getElementById("calendar-event-data")
console.log(calendarEventList)

let joined = false;
(async function() {
    let res =await axios.get("https://localhost:3000/event/all")
    console.log('new data', res.data)

    for(item of res.data.eventList) {

        let delEventBtn = ""
        let button = "";
        !item.joined ?  button =   `<button 
        type="button"
        class="btn btn-success" 
        value="${item.id}"
        onclick="joinEvent()"
    >
        Join Event
         </button>`:     button =  `<button 
            type="button"
            class="btn btn-danger"
            value="${item.id}"
            onclick="declineEvent()"
        >
            Decline
        </button>`

        if(item.creator === res.data.userId) {
            delEventBtn = `<button 
            type="button"
            class="btn btn-outline-danger"
            value="${item.id}"
            onclick="deleteEvent()"
        >
            Delete Event
        </button>`
        }

        calendarEventList.innerHTML += `
            <div>
                <div class="event-data d-flex justify-content-between" style= "text-align: left;" >
                    <div class="col-md-6">
                        <div class="text-capitalize">${"Event Name: "+item.event_name}</div>
                        <div>${"Description: " + item.description}</div>
                        <div>${"Event Type: " + item.event_type}</div>
                        <div>${"Event Start: " + dayjs(item.event_start).format('DD/MM/YYYY')}</div>
                        <button 
                            type="button"
                            class="btn btn-primary" 
                            value="${item.id}"
                            onclick="getEventParticipants()"
                        >
                            Show Event Participants
                        </button>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center align-items-center">
                  ${button}        
                    </div>
                    <div class="col-md-3 col-md-3 d-flex justify-content-center align-items-center">
                  ${delEventBtn}        
                    </div>
                    <hr>
                </div>
                <div>
                    <div id="event-participant-${item.id}"></div>
                </div>
            </div>
        `
    }
}())

async function getEventParticipants() {
    const id = event.target.value
    let eventParticipantList = document.querySelector(`#event-participant-${id}`)
    console.log('clicked get ppl', event.target.value)
    try {
        let res = await axios.get(`https://localhost:3000/event/participant/${id}`)
        // console.log("joined", joined);
        // console.log("change joined", res.data.joined)
        console.log('event user data', res.data)
        joined = res.data.joined;
        console.log("event html", eventParticipantList)
        for(item of res.data.participant) {
            eventParticipantList.innerHTML += `
                <div style= "text-align: left;" >
                    <div class="text-capitalize">${item.firstName}</div>
                </div>
            `
        }
    } catch (error) {
        console.log(error)
    }
}

async function joinEvent() {
    console.log('clicked get ppl', event.target.value)
    try {
        let res = await axios.post(`https://localhost:3000/event/add-participant`, {
            eventId: event.target.value
        })
        if (res) {
            console.log("add success", res)
            location.reload();
        }
    } catch (error) {
        console.log(error)
    }

}

async function declineEvent() {
    console.log('clicked remove ppl', event.target.value)
    try {
        let res = await axios.delete(`https://localhost:3000/event/del-participant/${event.target.value}`)
        if (res) {
            console.log("add success", res)
            location.reload();
        }
    } catch (error) {
        console.log(error)
    }

}

async function deleteEvent() {
    console.log('clicked remove ppl', event.target.value)
    try {
        let res = await axios.delete(`https://localhost:3000/event/del-event/${event.target.value}`)
        if (res) {
            console.log("del success", res)
            location.reload();
        }
    } catch (error) {
        console.log(error)
    }

}