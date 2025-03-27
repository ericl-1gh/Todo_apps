import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: {title: string};
  SplashScreen: undefined;
  BottomTabBar: undefined;
  WebViewScreen: undefined;
};
export type BottomTabBarParamList = {
  HomeScreen: undefined;
  SettingScreen: undefined;
};
export type LoginScreenNavigatorProps = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

export type SplashScreenNavigatorProps = NativeStackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

export type HomeScreenNavigatorProps = NativeStackNavigationProp<
  BottomTabBarParamList,
  'HomeScreen'
>;
