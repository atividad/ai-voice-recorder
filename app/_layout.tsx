import { Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Toaster } from 'sonner-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PostHogProvider } from 'posthog-react-native';

const POSTHOG_API_KEY = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
const HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST;
if (!POSTHOG_API_KEY) {
  throw new Error('Missing PostHog API Key. Please set EXPO_PUBLIC_POSTHOG_API_KEY in your .env');
}
/**
 * Root layout component for the voice notes app
 */
export default function RootLayout() {
  const router = useRouter();
  return (
    <GestureHandlerRootView>
      <PostHogProvider
        apiKey={POSTHOG_API_KEY}
        debug={true}
        options={{
          host: HOST,
        }}>
        <Toaster />
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Voice Notes' }} />
          <Stack.Screen
            name="new-recording"
            options={{
              title: 'New Recording',
              presentation: 'modal',
              headerLeft: () => (
                <Ionicons name="close" size={24} color="black" onPress={() => router.back()} />
              ),
            }}
          />
        </Stack>
      </PostHogProvider>
    </GestureHandlerRootView>
  );
}
