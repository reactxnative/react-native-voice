import { NativeModules, DeviceEventEmitter, EmitterSubscription, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@reactxnative/react-native-voice' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CustomVoiceRecognizer = NativeModules.CustomVoiceRecognizer
  ? NativeModules.CustomVoiceRecognizer
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function startListening(): void {
  if (Platform.OS === 'android') {
    CustomVoiceRecognizer.startListening();
  }
}

export function stopListening(): void {
  if (Platform.OS === 'android') {
    CustomVoiceRecognizer.stopListening();
  }
}

export function destroy(): void {
  if (Platform.OS === 'android') {
    CustomVoiceRecognizer.destroy();
  }
}

export function addSpeechResultsListener(callback: (value: string) => void): EmitterSubscription {
  return DeviceEventEmitter.addListener('onSpeechResults', (event) => callback(event.value));
}

export function addSpeechErrorListener(callback: (error: number) => void): EmitterSubscription {
  return DeviceEventEmitter.addListener('onSpeechError', (event) => callback(event.error));
}
