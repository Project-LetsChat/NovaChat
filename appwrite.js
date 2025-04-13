const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your endpoint
    .setProject('6769c3050016c57dccbf'); // Your project ID

const databases = new Appwrite.Databases(client);
const realtime = new Appwrite.Realtime(client);