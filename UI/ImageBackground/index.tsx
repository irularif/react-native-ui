import React from "react";
import {
  StyleSheet,
  ImageStyle,
  ImageBackground,
  ImageBackgroundProps as OriginImageBackgroundProps
} from "react-native";
import { UIImageLoading } from "../theme";

export interface ImageBackgroundProps extends OriginImageBackgroundProps {}

export default (props: ImageBackgroundProps) => {
  const { style, source } = props;
  const baseStyle: ImageStyle = {
    margin: 5,
    width: "100%",
    height: "100%"
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);
  let csource: any = source;
  if (typeof source === "object") {
    csource = {
      ...source,
      cache: "force-cache"
    };
  }
  return (
    <ImageBackground
      resizeMode={"contain"}
      defaultSource={UIImageLoading}
      {...props}
      source={csource}
      style={cstyle}
    />
  );
};
