let calendarEventList = document.getElementById("calendar-event-data")
console.log(calendarEventList)

async function getData () {
    let res = await axios.get("https://localhost:3000/event")
    console.log('calendar data', res.data)
    for(item of res.data) {
        calendarEventList.innerHTML += `
            <div>
                <div class="event-data d-flex justify-content-between" style= "text-align: left;" >
                    <div>
                        <div class="text-capitalize">${"Event Name: "+item.event_name}</div>
                        <div>${"Description: " + item.description}</div>
                        <div>${"Event Type: " + item.event_type}</div>
                        <div>${"Event Start: " + item.event_start}</div>
                        <button 
                            type="button"
                            class="btn btn-primary" 
                            value="${item.id}"
                            onclick="getEventParticipants()"
                        >
                            Show Event Participants
                        </button>
                    </div>
                    <div>
                        <button 
                            type="button"
                            class="btn btn-success" 
                            value="${item.id}"
                            onclick="joinEvent()"
                        >
                            Join Event
                        </button>
                        <button 
                            type="button"
                            class="btn btn-danger"
                            value="${item.id}"
                        >
                            Decline
                        </button>
                    </div>
                    <hr>
                </div>
                <div>
                    <div id="event-participant-${item.id}"></div>
                </div>
            </div>
        `
    }
}
getData()

async function getEventParticipants() {
    let eventParticipantList = document.querySelector(`#event-participant-${item.id}`)
    console.log('clicked get ppl', event.target.value)
    const id = event.target.value
    try {
        let res = await axios.get(`https://localhost:3000/event/${id}`)
        console.log('event user data', res.data)
        for(item of res.data) {
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
        }
    } catch (error) {
        console.log(error)
    }

}