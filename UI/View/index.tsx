import React from "react";
import {
  Animated,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps as OriViewProps
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaViewProps } from "react-navigation";
import Theme from "../../theme";

export interface IViewProps
  extends OriViewProps,
    ScrollViewProps,
    SafeAreaViewProps,
    KeyboardAvoidingViewProps {
  type?:
    | "View"
    | "SafeAreaView"
    | "AnimatedView"
    | "ScrollView"
    | "KeyboardAvoidingView";
  shadow?: boolean;
}

export default (props: IViewProps) => {
  const { type, shadow, style } = props;
  const shadowStyle = !!shadow ? Theme.UIShadow : {};
  let cstyle = StyleSheet.flatten([shadowStyle, style]);

  switch (type) {
    case "AnimatedView":
      return <Animated.View {...props} style={cstyle} />;
    case "ScrollView":
      return (
        <ScrollView
          {...props}
          keyboardShouldPersistTaps={"handled"}
          style={cstyle}
        />
      );
    case "KeyboardAvoidingView":
      return (
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          {...props}
          style={cstyle}
        />
      );
    default:
      return <View {...props} style={cstyle} />;
  }
};
