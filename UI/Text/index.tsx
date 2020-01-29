import React from "react";
import {
  TextProps as OriginTextProps,
  Text,
  StyleSheet,
  TextStyle
} from "react-native";
import _ from "lodash";
import { UIFontFamily, UIFontSize } from "../theme";

export interface TextProps extends OriginTextProps {
  children: string;
  color?: "white" | "black";
}

export default (props: TextProps) => {
  const { style, color } = props;
  const baseStyle: TextStyle = {
    margin: 5,
    fontFamily: UIFontFamily,
    fontSize: UIFontSize,
    color
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);

  return <Text {...props} style={cstyle} />;
};
