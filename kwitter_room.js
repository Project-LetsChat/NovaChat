const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6769c3050016c57dccbf');

const databases = new Appwrite.Databases(client);
const realtime = new Appwrite.Realtime(client);
const account = new Appwrite.Account(client);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const user_name = localStorage.getItem("user_name");
    if (!user_name) window.location = "index.html";
    document.getElementById("user_name").textContent = `Welcome ${user_name}!`;
    
    getData();
});

async function addRoom() {
    const room_name = document.getElementById("room_name").value.trim();
    if (!room_name) {
        alert("Please enter a room name.");
        return;
    }

    try {
        await databases.createDocument(
            'main', // Your database ID
            'rooms', // Your collection ID
            Appwrite.ID.unique(),
            {
                name: room_name,
                created_by: localStorage.getItem("user_name"),
                created_at: new Date().toISOString()
            }
        );
        
        localStorage.setItem("room_name", room_name);
        window.location = "kwitter_page.html";
    } catch (error) {
        console.error("Error creating room:", error);
        alert("Error creating room: " + error.message);
    }
}

function getData() {
    // Real-time subscription
    const unsubscribe = realtime.subscribe('databases.main.collections.rooms.documents', response => {
        if (response.events.includes('databases.*.collections.rooms.documents.*.create')) {
            addRoomToUI(response.payload.name);
        }
    });

    // Initial load
    databases.listDocuments('main', 'rooms')
        .then(response => {
            response.documents.forEach(room => addRoomToUI(room.name));
        })
        .catch(error => console.error("Error loading rooms:", error));
}

function addRoomToUI(roomName) {
    const output = document.getElementById("output");
    if (!document.getElementById(roomName)) {
        const roomElement = document.createElement('div');
        roomElement.className = 'room_name';
        roomElement.id = roomName;
        roomElement.onclick = () => redirectToRoomName(roomName);
        roomElement.textContent = `#${roomName}`;
        
        const hr = document.createElement('hr');
        output.appendChild(roomElement);
        output.appendChild(hr);
    }
}

function redirectToRoomName(name) {
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
  account.deleteSession('current')
      .then(() => {
          localStorage.clear();
          window.location.href = "index.html";
      })
      .catch(error => {
          console.error("Logout error:", error);
          localStorage.clear();
          window.location.href = "index.html";
      });
}