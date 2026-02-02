// Get DOM elements
const eventListEl = document.getElementById("eventList");
const addInput = document.getElementById("eventName");

// Events store
// these are available events to register for
let events = [
    {
        id: 1,
        name: "Music Night",
        description: "Enjoy live music with friends.",
        participants: 0,
        registered: false
    },
    {
        id: 2,
        name: "Dance Party",
        description: "Dance the night away with friends.",
        participants: 0,
        registered: false

    },
    {
        id: 3,
        name: "Art Workshop",
        description: "Explore your creativity with art.",
        participants: 0,
        registered: false
    }
];
// Render events to the DOM
function renderEvents() {
    // clear existing 
    eventListEl.innerHTML = "";
//here we are using forEach loop to iterate through each event in the events array and create a card for each event with its details and action buttons.

    events.forEach((ev) => {
        const card = document.createElement("div");
        card.className = "event";

// here we are creating title element so we can display event name
        const title = document.createElement("h3");
        title.textContent = ev.name;

// here we are creating description element so we can display event description
        const desc = document.createElement("p");
        desc.textContent = ev.description;

// here we are creating participants element so we can display number of participants
        const participants = document.createElement("p");
        participants.innerHTML = `<strong>Participants:</strong> <span class="count">${ev.participants}</span>`;

// here we are creating actions container to hold buttons
        const actions = document.createElement("div");

// here we are creating register button
        const registerBtn = document.createElement("button");
        registerBtn.textContent = ev.registered ? "Registered" : "Register";// disable if already registered
        registerBtn.disabled = ev.registered;// register event handler
        registerBtn.addEventListener("click", function () {// prevent double registration
            if (ev.registered) {
                alert("You are already registered for this event.");
                return;
            }
            ev.participants++;// increment participant count
            ev.registered = true;// mark as registered
            renderEvents();// re-render to update UI
        });
//here we are creating unregister button
        const clearBtn = document.createElement("button");
        clearBtn.textContent = "Unregister";// unregister event handler
        clearBtn.addEventListener("click", function () {
            if (!ev.registered) {// prevent unregistering if not registered
                alert("You are not registered for this event.");
                return;
            }
            ev.participants = Math.max(0, ev.participants - 1);// decrement participant count
            ev.registered = false;
            renderEvents();
        });
// here we are assembling the card by appending buttons to actions container
        actions.appendChild(registerBtn);// append unregister button
        actions.appendChild(clearBtn);// assemble card

        card.appendChild(title);// append title
        card.appendChild(desc);// append description
        card.appendChild(participants);// append participant count
        card.appendChild(actions);// append actions

        eventListEl.appendChild(card);// append card to event list
    });
}

// Add new event from admin input
function addEvent() {
    const name = addInput.value && addInput.value.trim();
    if (!name) {
        alert("Please enter an event name.");
        return;
    }
// create new event object
    const newEvent = {
        id: Date.now(),
        name,
        description: document.getElementById("description").value || "Newly added event.", // here we get description if provided or else default text which is "Newly added event."
        participants: 0,
        registered: false
    };
// add to events list
    events.push(newEvent);
    addInput.value = "";
    document.getElementById("description").value = "";
    renderEvents();
}

// expose addEvent to global for inline onclick handler in HTML
window.addEvent = addEvent;

// now this is to initial render
renderEvents();
