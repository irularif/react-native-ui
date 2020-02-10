import React from "react";
import { WebView, WebViewProps } from "react-native-webview";
import View from "../View";
import Image from "../Image";
import Theme from "@src/libs/theme";
import Spinner from "../Spinner";
import { StyleSheet } from "react-native";

export interface IWebViewProps extends WebViewProps {
  loadingSource?: any;
  loadingStyle?: any;
}

export default (props: IWebViewProps) => {
  const { loadingSource, loadingStyle } = props;
  return (
    <WebView
      originWhitelist={["*", "intent://*"]}
      scalesPageToFit={true}
      textZoom={100}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      renderLoading={() => (
        <LoadingScreen source={loadingSource} style={loadingStyle} />
      )}
      startInLoadingState
      allowFileAccess={true}
      geolocationEnabled={true}
      saveFormDataDisabled={true}
      allowUniversalAccessFromFileURLs={true}
      cacheEnabled={true}
      {...props}
    />
  );
};

const LoadingScreen = ({ source, style }) => {
  const baseStyle = {
    width: 120,
    height: 50,
    marginBottom: 20
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);
  return (
    <View
      style={{
        backgroundColor: Theme.UIColors.primary,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
      type={"View"}
    >
      <Image source={source || Theme.UIImageLoading} style={cstyle}></Image>
      <Spinner
        size={"large"}
        style={{
          alignSelf: "center"
        }}
        color={"#fff"}
      ></Spinner>
    </View>
  );
};
