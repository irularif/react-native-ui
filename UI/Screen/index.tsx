import React from "react";
import View, { IViewProps } from "../View";
import Constants from "expo-constants";
import { ViewStyle, StyleSheet } from "react-native";
import Theme from "../../theme";

export interface IScreenProps extends IViewProps {}

export default (props: IScreenProps) => {
  const { style } = props;
  const safeAreaStyle: ViewStyle = {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#fff",
    padding: 0,
    margin: 0
  };
  let cstyle = StyleSheet.flatten([safeAreaStyle, style]);
  const statusbarStyle: ViewStyle = {
    backgroundColor: Theme.UIColors.primary,
    height: Constants.statusBarHeight,
    zIndex: 99
  };
  return (
    <>
      <View style={statusbarStyle} />
      <View {...props} style={cstyle} />
    </>
  );
};
