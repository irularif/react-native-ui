import React from "react";
import {
  Image,
  ImageProps as OriginImageProps,
  StyleSheet,
  ImageStyle
} from "react-native";
import { UIImageLoading } from "../theme";

export interface ImageProps extends OriginImageProps {}

export default (props: ImageProps) => {
  const { style, source } = props;
  const baseStyle: ImageStyle = {
    margin: 5,
    width: 300,
    height: 150
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
    <Image
      resizeMode={"contain"}
      defaultSource={UIImageLoading}
      {...props}
      source={csource}
      style={cstyle}
    />
  );
};
