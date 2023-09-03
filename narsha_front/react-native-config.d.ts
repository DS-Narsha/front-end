declare module 'react-native-config' {
  export interface NativeConfig {
    APP_ID?: string;
    API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
