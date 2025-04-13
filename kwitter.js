// Initialize Appwrite client
const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6769c3050016c57dccbf'); // Your project ID

const account = new Appwrite.Account(client); // Add this line

function addUser() {
    const username = document.getElementById("user_name").value.trim();
    if (!username) {
        alert("Please enter a username");
        return false;
    }

    // Add loading state
    const btn = document.querySelector('.button1');
    btn.disabled = true;
    btn.innerHTML = 'Logging in...';

    account.createAnonymousSession()
        .then(() => {
            localStorage.setItem("user_name", username);
            window.location.href = "kwitter_room.html"; // Use href instead of location
        })
        .catch(error => {
            console.error("Auth error:", error);
            // Fallback with warning
            localStorage.setItem("user_name", username);
            alert("Warning: Using localStorage fallback");
            window.location.href = "kwitter_room.html";
        })
        .finally(() => {
            btn.disabled = false;
            btn.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        });

    return false;
}