import React from "react";
import {
  View,
  ViewProps as OriViewProps,
  ScrollViewProps,
  KeyboardAvoidingViewProps,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
  Animated,
  StyleSheet,
  Platform
} from "react-native";
import { SafeAreaViewProps } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import _ from "lodash";
import { UIShadow } from "../theme";
export interface ViewProps
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

export default (props: ViewProps) => {
  const { type, shadow, style } = props;
  const statusbar = StatusBar.currentHeight || 0;
  const shadowStyle = !!shadow ? UIShadow : {};
  const safeAreaStyle = {
    paddingTop:
      type === "SafeAreaView" && Platform.OS === "android"
        ? statusbar
        : undefined
  };
  let cstyle = StyleSheet.flatten([
    { backgroundColor: "#fff", padding: 5, margin: 5 },
    shadowStyle,
    safeAreaStyle,
    style
  ]);

  if (type === "SafeAreaView")
    return <SafeAreaView {...props} style={cstyle} />;
  if (type === "AnimatedView")
    return <Animated.View {...props} style={cstyle} />;
  if (type === "ScrollView") {
    return (
      <ScrollView
        {...props}
        keyboardShouldPersistTaps={"handled"}
        style={cstyle}
      />
    );
  }
  if (type === "KeyboardAvoidingView") {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        {...props}
        style={cstyle}
      />
    );
  }

  return <View {...props} style={cstyle} />;
};
