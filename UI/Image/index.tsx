import React, { useState } from "react";
import {
  Image,
  ImageProps as OriginImageProps,
  StyleSheet,
  ImageStyle
} from "react-native";
import _ from "lodash";
import Theme from "../../theme";

export interface IImageProps extends OriginImageProps {
  mode?: "avatar";
}

export default (props: IImageProps) => {
  const { style, source, mode } = props;
  const [error, setError] = useState(false);
  const baseStyle: ImageStyle = {
    margin: 4,
    width: 300,
    height: 150
  };
  const avatarStyle = {
    width: 45,
    height: 45,
    borderRadius: 99,
    overflow: "hidden"
  };
  const modeStyle = mode === "avatar" ? avatarStyle : {};
  const cstyle = StyleSheet.flatten([baseStyle, modeStyle, style]);
  let csource: any = source;
  if (typeof source === "object") {
    csource = {
      ...source,
      cache: "force-cache"
    };
  }
  return (
    <>
      {error ? (
        <Image
          resizeMode={"contain"}
          defaultSource={Theme.UIImageLoading}
          {...props}
          source={csource}
          style={cstyle}
          onError={e => {
            const err = _.get(e, "mativeEvent.error", "");
            if (!!err) setError(true);
          }}
        />
      ) : (
        <Image
          resizeMode={"contain"}
          defaultSource={Theme.UIImageLoading}
          {...props}
          source={csource}
          style={cstyle}
        />
      )}
    </>
  );
};
