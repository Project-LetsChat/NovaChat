function addUser() {
    let user_name = document.getElementById("user_name").value;
    if (user_name.trim() !== "") { // Check if the user name is not empty
        localStorage.setItem("user_name", user_name);
        window.location = "LetsChat_room.html";
        alert("Welcome to NeoChat!")
    } else {
        alert("Please enter a user name.");
    }
}

window.LetsChat = true;

