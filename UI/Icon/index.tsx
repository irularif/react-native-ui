import * as IconSource from "@expo/vector-icons";
import React from "react";
import { ViewStyle, StyleSheet } from "react-native";

export interface IconProps {
  source?:
    | "AntDesign"
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "FontAwesome"
    | "Foundation"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "Octicons"
    | "SimpleLineIcons"
    | "Zocial";
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}
export default (props: IconProps) => {
  const { source, style, size, name } = props;
  const Icon: any = (IconSource as any)[source || "Ionicons"];
  const baseStyle = {
    margin: 5
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);
  const csize = size || 20;

  return <Icon {...props} size={csize} style={cstyle} />;
};
