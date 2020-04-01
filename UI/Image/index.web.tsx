import React, { useState } from "react";
import {
  Image as ImageOrigin,
  ImageProps as OriginImageProps,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  Dimensions
} from "react-native";
import _ from "lodash";
import Theme from "../../theme";
import Modal, { ModalProps } from "../Modal";
import View from "../View";
import Button from "../Button";
import Icon from "../Icon";

const ImageError =
  require("../../../asset/image/logo.png") ||
  require("../../asset/image/error.png");
const Logo = require("../../../asset/image/logo.png") || Theme.UIImageLoading;

export interface IImageProps extends OriginImageProps {
  mode?: "avatar";
  modeStyle?: ViewStyle;
  preview?: boolean;
  previewProps?: ModalProps;
  previewImageProps?: OriginImageProps | any;
  previewStyle?: ViewStyle;
  previewWrapperStyle?: ViewStyle;
}

const Image = (props: IImageProps) => {
  const { style, source, mode, preview, modeStyle } = props;
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const baseStyle: ImageStyle = {
    width: "100%",
    height: 150
  };
  const avatarImgStyle = {
    width: 45,
    height: 45
  };
  const avatarStyle = {
    width: 50,
    height: 50,
    borderRadius: 999,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.UIColors.primary
  };
  const cmodeStyle = mode === "avatar" ? avatarStyle : {};
  const modeImgStyle = mode === "avatar" ? avatarImgStyle : {};
  const cstyle = StyleSheet.flatten([baseStyle, modeImgStyle, style]);
  const cmodstyle = StyleSheet.flatten([cmodeStyle, modeStyle]);

  const btnStyle: ViewStyle = {
    ...cstyle,
    position: "absolute",
    top: 0,
    backgroundColor: "transparent",
    opacity: !preview ? 1 : undefined
  };

  let csource: any = source;
  if (typeof source === "object") {
    csource = {
      ...source,
      cache: "force-cache"
    };
  }
  const onPress = () => {
    setShow(!show);
  };
  const onError = (e: any) => {
    const err = _.get(e, "nativeEvent.error", "");
    if (!!err) setError(true);
  };
  return (
    <>
      {!error ? (
        <>
          {mode === "avatar" ? (
            <View style={cmodstyle}>
              <ImageOrigin
                resizeMode={"contain"}
                defaultSource={Logo}
                {...props}
                source={csource}
                style={cstyle}
                onError={onError}
              />
            </View>
          ) : (
            <ImageOrigin
              resizeMode={"contain"}
              defaultSource={Logo}
              {...props}
              source={csource}
              style={cstyle}
              onError={onError}
            />
          )}
          <Button
            activeOpacity={preview ? 0.7 : 1}
            style={btnStyle}
            disabled={!preview}
            onPress={onPress}
          ></Button>
        </>
      ) : (
        <ImageOrigin
          defaultSource={Logo}
          {...props}
          resizeMode={"contain"}
          source={ImageError}
          style={cstyle}
        />
      )}
    </>
  );
};

export default Image;
