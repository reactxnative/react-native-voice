module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './android',
        packageImportPath: 'import com.reactxnative.reactnativevoice.ReactNativeVoicePackage;',
        packageInstance: 'new ReactNativeVoicePackage()',
      },
    },
  },
};
