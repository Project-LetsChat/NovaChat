// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDCKd9OXejZ-0PK729riphOd6Z1KgrzjCo",
    authDomain: "letschattestbranch.firebaseapp.com",
    databaseURL: "https://letschattestbranch-default-rtdb.firebaseio.com/",
    projectId: "letschattestbranch",
    storageBucket: "letschattestbranch.appspot.com",
    messagingSenderId: "1048525961569",
    appId: "1:1048525961569:web:83583f3ab3a726da266d20"
};


firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

// Function to send message
function send() {
    const msg = document.getElementById("msg").value.trim();
    if (!msg) {
      alert("Please enter some text!");
      return;
    }
  
    const messageData = {
      name: localStorage.getItem("user_name"),
      message: msg,
      like: 0,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
  
    // Validate against security rules
    if (!validateMessage(messageData)) {
      alert("Invalid message format");
      return;
    }
  
    firebase.database().ref(room_name).push(messageData)
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Error sending message: " + error.message);
      });
  
    document.getElementById("msg").value = "";
  }
  
// New validation function
function validateMessage(data) {
    return data.name && 
           typeof data.name === 'string' &&
           data.message &&
           typeof data.message === 'string' &&
           typeof data.like === 'number' &&
           data.name.length < 50 &&
           data.message.length < 1000;
}

// Function to sanitize user inputs
function sanitizeHTML(str) {
  var temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Function to get data and display messages
function getData() {
  const messagesRef = firebase.database().ref(room_name);
  messagesRef.on('value', (snapshot) => {
    let html = "";
    snapshot.forEach((childSnapshot) => {
      const messageData = childSnapshot.val();
      if (messageData.name && messageData.message) { // Add proper validation
        html += `
          <div class="message">
            <h4>${sanitizeHTML(messageData.name)} 
              <img class="user_tick" src="tick.png">
            </h4>
            <p class="message_h4">${sanitizeHTML(messageData.message)}</p>
            <button class="btn btn-warning" 
                    id="${childSnapshot.key}" 
                    onclick="updateLike(this.id)"
                    data-likes="${messageData.like || 0}">
              <span class="glyphicon glyphicon-thumbs-up">
                Likes: ${messageData.like || 0}
              </span>
            </button>
            <hr>
          </div>
        `;
      }
    });
    document.getElementById("output").innerHTML = html;
  });
}

// Call getData to fetch and display messages
getData();

// Function to update likes
function updateLike(message_id) {
    const ref = firebase.database().ref(`${room_name}/${message_id}/like`);
    ref.transaction((currentLikes) => {
      return (currentLikes || 0) + 1;
    }).catch((error) => {
      console.error("Error updating likes:", error);
    });
}

// Function to log out
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}

// Add click event listener to send button
document.getElementById("sendButton").addEventListener("click", function() {
  send();
});
