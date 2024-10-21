# AI Voice Recorder & Note Taking App with PostHog

Record your voice and take notes with AI transcription. Store your notes in the cloud and sync them across all your devices using Firebase. Watch how users interact with your app and replay sessions to understand how to improve your app using [PostHog](http://posthog.com/simongrimm).


## Technologies Used

- React Native
- Expo
- Firebase Firestore
- [PostHog](http://posthog.com/simongrimm) for analytics and session replays
- expo-router for navigation
- expo-av for voice recording
- sonner-native for toast notifications

## Getting Started

### Prerequisites

- Node.js
- Expo CLI
- Firebase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Galaxies-dev/ai-voice-recorder
   ```

2. Navigate to the project directory:
   ```
   cd ai-voice-recorder
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your Firebase configuration in `utils/FirebaseConfig.ts`

5. Create your own `.env` file and insert your credentials.

6. Start the Expo development server:
   ```
   npx expo run:android
   ```

## Project Structure

- `app/index.tsx`: Main screen with the list of notes
- `app/new-recording.tsx`: Transcription screen
- `app/[id].tsx`: Screen for editing and deleting a specific note
- `utils/FirebaseConfig.ts`: Firebase configuration


## 🚀 More

**Take a shortcut from web developer to mobile development fluency with guided learning**

Enjoyed this project? Learn to use React Native to build production-ready, native mobile apps for both iOS and Android based on your existing web development skills.

<a href="https://galaxies.dev"><img src="banner.png" height="auto" width="100%"></a>