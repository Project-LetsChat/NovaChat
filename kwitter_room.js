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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.getAnalytics(app); // Analytics will be disabled for the foreseeable future.
//const analytics = getAnalytics(app);

// ADD YOUR FIREBASE LINKS HERE
let user_name = localStorage.getItem("user_name");

if (user_name) {
    // Sanitize the user name before injecting it into the HTML
    document.getElementById("user_name").textContent = "Welcome " + user_name + "!";
} else {
    // Redirect to login page if user_name is not found
    window.location = "index.html";
}

function addRoom() {
    let room_name = document.getElementById("room_name").value.trim();
    if (!room_name) {
      alert("Please enter a room name.");
      return;
    }
  
    // Create initial room structure
    const roomData = {
      purpose: "chat_room",
      created_at: firebase.database.ServerValue.TIMESTAMP,
      created_by: localStorage.getItem("user_name")
    };
  
    firebase.database().ref(room_name).set(roomData)
      .then(() => {
        localStorage.setItem("room_name", room_name);
        window.location = "kwitter_page.html";
      })
      .catch((error) => {
        console.error("Error creating room:", error);
        alert("Error creating room: " + error.message);
      });
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            let childKey = childSnapshot.key;
            let Room_names = childKey;
            // Start code
            console.log("Room name - " + Room_names);

            // Create room element dynamically and set attributes safely
            let roomElement = document.createElement('div');
            roomElement.className = 'room_name';
            roomElement.id = Room_names;
            roomElement.onclick = function() { redirectToRoomName(this.id); };
            roomElement.textContent = "#" + Room_names;

            // Create a horizontal rule element
            let hr = document.createElement('hr');

            // Append room element and horizontal rule to output
            document.getElementById("output").appendChild(roomElement);
            document.getElementById("output").appendChild(hr);
            // End code
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
