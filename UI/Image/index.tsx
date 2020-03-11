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
  const onError = e => {
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
      <PreviewImage show={show} setShow={setShow} imgProps={props} />
    </>
  );
};

const PreviewImage = (props: any) => {
  const { show, setShow, imgProps } = props;
  const dim = Dimensions.get("window");
  const onRequestClose = () => {
    setShow(!show);
  };
  const baseModalStyle = {
    backgroundColor: "rgba(0,0,0,0.8)",
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "column"
  };
  const modalStyle = StyleSheet.flatten([
    baseModalStyle,
    imgProps.previewStyle
  ]);
  const baseWrapperStyle = {
    padding: 0,
    justifyContent: "center",
    alignItems: "stretch",
    flexShrink: 1
  };
  const wrapperStyle = StyleSheet.flatten([
    baseWrapperStyle,
    imgProps.previewWrapperStyle
  ]);
  const baseImgStyle = {
    width: "100%",
    height: "100%",
    maxWidth: dim.width,
    maxHeight: dim.height
  };
  const imageStyle = StyleSheet.flatten([
    baseImgStyle,
    _.get(imgProps, "previewImageProps.style", {})
  ]);
  return (
    <Modal
      visible={show}
      onRequestClose={onRequestClose}
      {...imgProps.previewProps}
    >
      <View style={modalStyle}>
        <View style={wrapperStyle}>
          <Image
            resizeMode={"contain"}
            {...imgProps}
            {...imgProps.previewImageProps}
            style={imageStyle}
            preview={false}
          />
        </View>
      </View>
      <Button
        style={{
          minWidth: 40,
          minHeight: 40,
          margin: 0,
          width: 40,
          height: 40,
          position: "absolute",
          top: 15,
          left: 15,
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: 99,
          padding: 0,
          paddingLeft: 0,
          paddingRight: 0
        }}
        onPress={onRequestClose}
      >
        <Icon
          source={"AntDesign"}
          name={"arrowleft"}
          size={30}
          style={{
            margin: 5
          }}
        />
      </Button>
    </Modal>
  );
};

export default Image;
