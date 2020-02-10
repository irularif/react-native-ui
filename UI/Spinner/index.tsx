import Theme from "@src/libs/theme";
import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export default (props: ActivityIndicatorProps) => {
  return <ActivityIndicator color={Theme.UIColors.primary} {...props} />;
};
