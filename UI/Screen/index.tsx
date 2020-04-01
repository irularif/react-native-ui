import Constants from "expo-constants";
import React from "react";
import {
  StatusBar,
  StatusBarProps,
  StyleSheet,
  ViewProps,
  ViewStyle
} from "react-native";
import Theme from "../../appearance/Theme";
import View from "../View";

export interface IScreenProps extends ViewProps {
  children?: any;
  statusbarStyle?: any;
  statusBarProps?: StatusBarProps;
}

export default (props: IScreenProps) => {
  const { style, statusbarStyle, statusBarProps } = props;
  const safeAreaStyle: ViewStyle = {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: Theme.UIColors.background,
    padding: 0,
    margin: 0
  };
  let cstyle = StyleSheet.flatten([safeAreaStyle, style]);
  const defStatusbarStyle: ViewStyle = {
    backgroundColor: Theme.UIColors.primary,
    height: Constants.statusBarHeight,
    zIndex: 99
  };
  const cstatusbarStyle = StyleSheet.flatten([
    defStatusbarStyle,
    statusbarStyle
  ]);
  return (
    <>
      <View style={cstatusbarStyle}>
        <StatusBar
          backgroundColor={Theme.UIColors.primary}
          barStyle={"light-content"}
          {...statusBarProps}
        />
      </View>
      <View {...props} style={cstyle} />
    </>
  );
};
