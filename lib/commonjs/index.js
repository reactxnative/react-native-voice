"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSpeechErrorListener = addSpeechErrorListener;
exports.addSpeechResultsListener = addSpeechResultsListener;
exports.destroy = destroy;
exports.startListening = startListening;
exports.stopListening = stopListening;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package '@reactxnative/react-native-voice' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const CustomVoiceRecognizer = _reactNative.NativeModules.CustomVoiceRecognizer ? _reactNative.NativeModules.CustomVoiceRecognizer : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function startListening() {
  if (_reactNative.Platform.OS === 'android') {
    CustomVoiceRecognizer.startListening();
  }
}
function stopListening() {
  if (_reactNative.Platform.OS === 'android') {
    CustomVoiceRecognizer.stopListening();
  }
}
function destroy() {
  if (_reactNative.Platform.OS === 'android') {
    CustomVoiceRecognizer.destroy();
  }
}
function addSpeechResultsListener(callback) {
  return _reactNative.DeviceEventEmitter.addListener('onSpeechResults', event => callback(event.value));
}
function addSpeechErrorListener(callback) {
  return _reactNative.DeviceEventEmitter.addListener('onSpeechError', event => callback(event.error));
}
//# sourceMappingURL=index.js.map