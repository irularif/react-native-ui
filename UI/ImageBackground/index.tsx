import React from "react";
import {
  StyleSheet,
  ImageStyle,
  ImageBackground,
  ImageBackgroundProps as OriginImageBackgroundProps
} from "react-native";
import Theme from "../../appearance/Theme";

export interface IImageBackgroundProps extends OriginImageBackgroundProps {}

export default (props: IImageBackgroundProps) => {
  const { style, source } = props;
  const baseStyle: ImageStyle = {
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
      defaultSource={Theme.UIImageLoading}
      {...props}
      source={csource}
      style={cstyle}
    />
  );
};
