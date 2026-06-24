# @reactxnative/react-native-voice

### 🎥 [Click here to watch the Demo Video!](https://github.com/reactxnative/react-native-voice/raw/main/demo/demo.mov)

A high-performance, custom React Native voice recognition library built entirely using the new Android Native TurboModule Architecture (Bridgeless-ready). 

It uses Android's built-in `SpeechRecognizer` API to deliver fast, offline-capable (depending on OS), and highly accurate voice-to-text recognition with no external dependencies. Currently optimized for Android.

## Features
- 🚀 **TurboModule Architecture:** Blazing fast performance using the latest React Native architecture.
- 🔗 **Bridgeless Compatible:** Fully supports React Native 0.74+ and 0.86+ New Architecture defaults.
- 🎤 **Zero Dependencies:** Uses pure Android native `SpeechRecognizer` class.
- ⚡ **Auto-Unwrapping:** Super clean JS API that returns raw strings instead of bulky objects.
- 🇮🇳 **Multi-Lingual:** Supports free-form language modeling (default initialized for Hindi/English but highly extensible).

---

## Installation

```sh
npm install @reactxnative/react-native-voice
```
or 
```sh
yarn add @reactxnative/react-native-voice
```

## Android Permissions Setup
Since this library interacts with the device's hardware microphone, you must add the following permissions to your `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```
*(Note: You must also request runtime permissions in your JS code using `PermissionsAndroid.request` before calling `startListening()`).*

---

## Usage Example

```typescript
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { 
  startListening, 
  stopListening, 
  destroy, 
  addSpeechResultsListener, 
  addSpeechErrorListener 
} from '@reactxnative/react-native-voice';

export default function App() {
  const [text, setText] = useState('');
  const [error, setError] = useState<number | null>(null);

  useEffect(() => {
    // 1. Subscribe to Speech Results
    const resultsSub = addSpeechResultsListener((spokenText: string) => {
      console.log('User said:', spokenText);
      setText(spokenText);
    });

    // 2. Subscribe to Speech Errors
    const errorSub = addSpeechErrorListener((errCode: number) => {
      console.error('Speech Error Code:', errCode);
      setError(errCode);
      
      // Common error codes: 
      // 6 = Timeout (No speech heard)
      // 7 = No match (Speech not recognized)
    });

    return () => {
      // Clean up listeners and destroy native recognizer when component unmounts
      resultsSub.remove();
      errorSub.remove();
      destroy();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>{text || "Press mic to speak..."}</Text>
      
      <Button title="Start Listening" onPress={() => {
        setError(null);
        startListening();
      }} />
      
      <Button title="Stop" onPress={() => stopListening()} />
      
      {error && <Text style={{ color: 'red' }}>Error Code: {error}</Text>}
    </View>
  );
}
```

## API Reference

### Methods

| Method | Description |
|--------|-------------|
| `startListening()` | Initializes the native `SpeechRecognizer` (if not already created) and begins listening to user audio. |
| `stopListening()` | Instructs the recognizer to stop listening. It may still process audio already captured. |
| `destroy()` | Completely destroys the native recognizer instance and frees up memory. Call this when your component unmounts. |

### Event Listeners

| Method | Callback Type | Description |
|--------|--------------|-------------|
| `addSpeechResultsListener` | `(spokenText: string) => void` | Fires when the recognizer successfully determines a final result. Returns a clean string. |
| `addSpeechErrorListener` | `(errorCode: number) => void` | Fires when a native Android speech error occurs. |

### Common Android Speech Error Codes
* `1` - Network operation timed out.
* `2` - Other network related errors.
* `3` - Audio recording error.
* `4` - Server sends error status.
* `5` - Other client side errors (e.g., cancelled by user).
* `6` - No speech input (User was silent for 10 seconds).
* `7` - No recognition result matched (Couldn't understand the speech).
* `8` - RecognitionService busy.
* `9` - Insufficient permissions (You forgot to request `RECORD_AUDIO`).

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
