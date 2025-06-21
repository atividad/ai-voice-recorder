// signaling.ts
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid"; // Use uuid for unique request IDs

console.log(process.env.EXPO_PUBLIC_SERVER_SOCKET);
const clientId = process.env.EXPO_PUBLIC_CLIENT_ID || uuidv4();

// export const socket = io(process.env.EXPO_PUBLIC_SERVER_SOCKET); // adjust to your backend URL
export const socket = io(process.env.EXPO_PUBLIC_SERVER_SOCKET, {
  auth: {
    clientId, // Send client ID on connection
  },
  // transports: ["websocket"], // Use WebSocket transport
});

export const sendMessage = (text: string) => {
  socket.emit("message", { text });
};

export const sendVoice = (audio: string) => {
  socket.emit('voice', { audio }); // for base64 audio blobs / per-chunk audio
};

export const stopVoiceStream = () => {
  socket.emit("voice", { isFinal: true }); // triggers final save
};

// export const sendInquiry = (text: string) => {
//   const id = uuidv4();
//   socket.emit("inquiry_request", { id, text });

//   const responseHandler = (data: any) => {
//     if (data.id === id) {
//       console.log("✅ Transcription Result:", data.message);
//       socket.off("inquiry_response", responseHandler); // Clean up listener
//     }
//   };

//   socket.on("inquiry_response", responseHandler);
// }
