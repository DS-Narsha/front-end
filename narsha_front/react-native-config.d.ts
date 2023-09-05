declare module 'react-native-config' {
  export interface NativeConfig {
    APP_ID?: string;
    HOST_NAME?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
