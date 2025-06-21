import {
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { Audio } from "expo-av";
import { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import { socket, sendVoice, stopVoiceStream } from "../utils/signaling";

/**
 * Mock ListItem component (since Firebase was removed)
 */
const ListItem = ({ id, preview, createdAt }: any) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemText}>{preview || "Voice Note"}</Text>
    <Text style={styles.listItemDate}>{createdAt?.toLocaleString?.() || ""}</Text>
  </View>
);

/**
 * Main index component for the voice notes app (no Firebase)
 */
export default function Index() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  /**
   * Start recording audio
   */
  async function startRecording() {
    try {
      const permissionResponse = await Audio.requestPermissionsAsync();
      if (permissionResponse.status !== "granted") {
        Alert.alert("Permission not granted");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  /**
   * Stop recording audio and send it to the server
   */
  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (!uri) {
        console.error("Failed to get URI for recording");
        return;
      }

      console.log("🎤 Audio URI:", uri);

      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      sendVoice(base64Audio);
      stopVoiceStream(); // signal that recording is complete

      router.push(`/new-recording?uri=${encodeURIComponent(uri)}`);
    } catch (err) {
      console.error("Failed to process audio file", err);
    }
  }

  return (
    <View style={styles.container}> 
      <FlatList
        data={[]}  
        renderItem={() => null}
        keyExtractor={() => ""}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notes available</Text>
        }
      />

      <View style={[styles.buttonContainer, { bottom }]}>
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={[
            styles.recordButton,
            recording ? styles.recordingButton : styles.notRecordingButton,
          ]}
        >
          <Ionicons name={recording ? "stop" : "mic"} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    position: "absolute",
    alignSelf: "center",
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButton: {
    backgroundColor: "#ff4444",
  },
  notRecordingButton: {
    backgroundColor: "#4444ff",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
  },
  listItem: {
    padding: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemDate: {
    fontSize: 12,
    color: "#666",
  },
  emptyText: {
    marginTop: 40,
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
});
