// Initialize AppWrite client once
window.client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6769c3050016c57dccbf');

window.databases = new Appwrite.Databases(client);
window.account = new Appwrite.Account(client);