import React, { useState } from "react";
import {
  Image,
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

const ImageError = require("../../asset/image/error.png");

export interface IImageProps extends OriginImageProps {
  mode?: "avatar";
  preview?: boolean;
  previewProps?: ModalProps;
  previewStyle?: ViewStyle;
  previewWrapperStyle?: ViewStyle;
  previewImageStyle?: ViewStyle;
}

export default (props: IImageProps) => {
  const { style, source, mode, preview } = props;
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const baseStyle: ImageStyle = {
    margin: 4,
    width: 300,
    height: 150
  };
  const avatarStyle = {
    width: 45,
    height: 45,
    borderRadius: 999,
    overflow: "hidden"
  };
  const modeStyle = mode === "avatar" ? avatarStyle : {};
  const cstyle = StyleSheet.flatten([baseStyle, modeStyle, style]);

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

  return (
    <>
      {!error ? (
        <>
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
          <Button
            activeOpacity={preview ? 0.7 : 1}
            style={btnStyle}
            disabled={!preview}
            onPress={onPress}
          ></Button>
        </>
      ) : (
        <Image
          resizeMode={"contain"}
          defaultSource={Theme.UIImageLoading}
          {...props}
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
    alignItems: "center"
  };
  const modalStyle = StyleSheet.flatten([
    baseModalStyle,
    imgProps.previewStyle
  ]);
  const baseImgStyle = {
    width: "100%",
    height: "100%",
    margin: 10
  };
  const imageStyle = StyleSheet.flatten([
    baseImgStyle,
    imgProps.previewImageStyle
  ]);
  return (
    <Modal
      visible={show}
      onRequestClose={onRequestClose}
      {...imgProps.previewProps}
    >
      <View style={modalStyle}>
        <Image resizeMode={"contain"} {...imgProps} style={imageStyle} />
        <Button
          style={{
            minWidth: 40,
            minHeight: 40,
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
      </View>
    </Modal>
  );
};
