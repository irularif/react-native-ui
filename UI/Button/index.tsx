import _ from "lodash";
import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet
} from "react-native";
import { UIShadow, UIColors } from "../theme";

export interface ButtonProps extends TouchableOpacityProps {
  shadow?: Boolean;
  type?: "Submit" | string;
  children: any;
}

export default (props: ButtonProps) => {
  const { disabled, shadow, style } = props;
  const disabledStyle = {
    opacity: !!disabled ? 0.5 : 1
  };
  const shadowStyle = !!shadow ? UIShadow : {};
  const baseStyle = {
    backgroundColor: UIColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    minWidth: 30,
    padding: 5,
    margin: 5
  };
  const cstyle = StyleSheet.flatten([
    baseStyle,
    disabledStyle,
    shadowStyle,
    style
  ]);
  return <TouchableOpacity activeOpacity={0.7} {...props} style={cstyle} />;
};
