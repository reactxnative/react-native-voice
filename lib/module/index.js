"use strict";

import { NativeModules, DeviceEventEmitter, Platform } from 'react-native';
const LINKING_ERROR = `The package '@reactxnative/react-native-voice' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const CustomVoiceRecognizer = NativeModules.CustomVoiceRecognizer ? NativeModules.CustomVoiceRecognizer : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export function startListening() {
  if (Platform.OS === 'android') {
    CustomVoiceRecognizer.startListening();
  }
}
export function stopListening() {
  if (Platform.OS === 'android') {
    CustomVoiceRecognizer.stopListening();
  }
}
export function destroy() {
  if (Platform.OS === 'android') {
    CustomVoiceRecognizer.destroy();
  }
}
export function addSpeechResultsListener(callback) {
  return DeviceEventEmitter.addListener('onSpeechResults', event => callback(event.value));
}
export function addSpeechErrorListener(callback) {
  return DeviceEventEmitter.addListener('onSpeechError', event => callback(event.error));
}
//# sourceMappingURL=index.js.map