const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6769c3050016c57dccbf');

const databases = new Appwrite.Databases(client);
const realtime = new Appwrite.Realtime(client);

let unsubscribeMessages;

document.addEventListener('DOMContentLoaded', () => {
    const room_name = localStorage.getItem("room_name");
    if (!room_name) window.location = "kwitter_room.html";
    
    getData();
    setupSendButton();
});

function setupSendButton() {
    document.getElementById("sendButton").addEventListener("click", send);
}

async function send() {
    const msgInput = document.getElementById("msg");
    const msg = msgInput.value.trim();
    if (!msg) return;

    try {
        await databases.createDocument(
            'main',
            'messages', // Your messages collection ID
            Appwrite.ID.unique(),
            {
                room: localStorage.getItem("room_name"),
                user: localStorage.getItem("user_name"),
                text: msg,
                likes: 0,
                timestamp: new Date().toISOString()
            }
        );
        msgInput.value = "";
    } catch (error) {
        console.error("Error sending message:", error);
        alert("Error sending message: " + error.message);
    }
}

function getData() {
    // Real-time subscription
    unsubscribeMessages = realtime.subscribe('databases.main.collections.messages.documents', response => {
        if (response.events.includes('databases.*.collections.messages.documents.*.create')) {
            if (response.payload.room === localStorage.getItem("room_name")) {
                addMessageToUI(response.payload);
            }
        }
    });

    // Initial load
    databases.listDocuments('main', 'messages', [
        Appwrite.Query.equal('room', localStorage.getItem("room_name"))
    ])
    .then(response => {
        response.documents.forEach(addMessageToUI);
    })
    .catch(error => console.error("Error loading messages:", error));
}

function addMessageToUI(message) {
    const output = document.getElementById("output");
    
    // Check if message already exists
    if (document.getElementById(message.$id)) return;

    const html = `
        <div class="message" id="${message.$id}">
            <h4>${sanitizeHTML(message.user)} 
                <img class="user_tick" src="tick.png">
            </h4>
            <p class="message_h4">${sanitizeHTML(message.text)}</p>
            <button class="btn btn-warning" 
                    onclick="updateLike('${message.$id}')"
                    data-likes="${message.likes}">
                <span class="glyphicon glyphicon-thumbs-up">
                    Likes: ${message.likes}
                </span>
            </button>
            <hr>
        </div>`;
    
    output.insertAdjacentHTML('beforeend', html);
}

async function updateLike(messageId) {
    try {
        const message = await databases.getDocument('main', 'messages', messageId);
        await databases.updateDocument('main', 'messages', messageId, {
            likes: message.likes + 1
        });
    } catch (error) {
        console.error("Error updating likes:", error);
    }
}

function logout() {
    unsubscribeMessages(); // Cleanup realtime subscription
    account.deleteSession('current')
        .finally(() => {
            localStorage.removeItem("user_name");
            localStorage.removeItem("room_name");
            window.location = "index.html";
        });
}

// XSS protection
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}