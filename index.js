const Eris = require("eris");
const os = require("os"); // For accessing environment variables

// Create Eris client instance
require("dotenv").config();
const client = new Eris(process.env.TOKEN, {
  shardCount: 1, // Adjust the shard count as needed
  shardID: 0, // Set the desired shard ID
});

// Function to set streaming presence
async function setStreamingPresence() {
  try {
    await client.editStatus("idle", {
      name: "your ❤️",
      type: 2, // Type 1 represents "PLAYING"
      url: "https://twitch.tv/paogah",
    });
    console.log("Streaming presence set successfully!");
  } catch (error) {
    console.error("Error setting streaming presence:", error);
  }
}

// // Function to set streaming presence
// async function setStreamingPresence() {
//   try {
//     await client.editStatus("online", {
//       activity: {
//         name: "feel",
//         url: "https://twitch.tv/paogah",
//         type: Eris.Constants.ActivityTypes.STREAMING, // Use Eris constant
//       },
//     });
//     console.log("Streaming presence set successfully!");
//   } catch (error) {
//     console.error("Error setting streaming presence:", error);
//   }
// }

// Function to run the bot (assuming keep_alive functionality is in keep_alive.js)
async function runBot() {
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;

  while (reconnectAttempts < maxReconnectAttempts) {
    try {
      await client.connect();
      console.log("Bot connected successfully!");
      await setStreamingPresence(); // Set presence after connection
      // ... (Add your bot's event listeners and logic here)
    } catch (error) {
      console.error("Error connecting to Discord:", error);
      reconnectAttempts++;
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
    }
  }
}

// Run the bot
runBot();

client.on("error", (error) => {
  console.error("Terjadi kesalahan:", error);
});

client.on("disconnect", () => {
  console.log("Terputus dari Discord.");
  // Consider adding logic for reconnecting after disconnect
});
