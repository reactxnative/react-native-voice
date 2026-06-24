import { EmitterSubscription } from 'react-native';
export declare function startListening(): void;
export declare function stopListening(): void;
export declare function destroy(): void;
export declare function addSpeechResultsListener(callback: (value: string) => void): EmitterSubscription;
export declare function addSpeechErrorListener(callback: (error: number) => void): EmitterSubscription;
//# sourceMappingURL=index.d.ts.map