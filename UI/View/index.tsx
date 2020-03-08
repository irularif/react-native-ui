import React from "react";
import {
  Animated,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps as OriViewProps,
  ScrollView
} from "react-native";
import Theme from "../../theme";
import {
  SafeAreaView,
  SafeAreaViewProps
} from "react-native-safe-area-context";

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
  childRef?: any;
}

export default (props: IViewProps) => {
  const { type, shadow, style, childRef } = props;
  const shadowStyle = !!shadow ? Theme.UIShadow : {};
  let cstyle = StyleSheet.flatten([shadowStyle, style]);

  switch (type) {
    case "AnimatedView":
      return <Animated.View ref={childRef} {...props} style={cstyle} />;
    case "SafeAreaView":
      return <SafeAreaView {...(props as any)} style={cstyle} />;
    case "ScrollView":
      return (
        <ScrollView
          {...props}
          ref={childRef}
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
          ref={childRef}
          style={cstyle}
        />
      );
    default:
      return <View {...props} style={cstyle} ref={childRef} />;
  }
};
