import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps as OriginTextInputProps,
  TextStyle
} from "react-native";
import { Text } from "..";
import { UIColors, UIFontFamily, UIFontSize } from "../theme";

export type TextInputType =
  | "text"
  | "number"
  | "password"
  | "decimal"
  | "multiline"
  | "currency";

export interface TextInputProps extends OriginTextInputProps {
  type?: TextInputType;
  onChangeText: (value) => void;
}
export default (props: TextInputProps) => {
  const { type, style, value, onChangeText } = props;
  let valueType = type;
  let cvalue = value;
  const onChange = input => {
    let val = input;
    switch (valueType) {
      case "number":
        val = parseInt(input);
        break;

      case "decimal":
        val = parseFloat(input);
        break;

      default:
        val = input;
        break;
    }
    onChangeText(val);
  };
  if (typeof value === "number") {
    valueType = "number";
    cvalue = String(cvalue);
  }

  let tprops = {};
  switch (type) {
    case "decimal":
    case "number":
      tprops = {
        keyboardType: "number-pad",
        value: cvalue
      };
      break;

    case "password":
      tprops = {
        secureTextEntry: true
      };
      break;

    case "multiline":
      tprops = {
        multiline: true,
        numberOfLines: 4
      };
      break;
  }

  const baseStyle: TextStyle = {
    margin: 5,
    padding: 10,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 0.8,
    borderColor: UIColors.primary,
    minHeight: 45,
    minWidth: 120,
    fontSize: UIFontSize,
    fontFamily: UIFontFamily
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);

  const cprops: OriginTextInputProps = {
    returnKeyType: "next",
    ...props,
    ...tprops,
    onChangeText: onChange,
    style: cstyle
  };

  switch (typeof value) {
    case "object":
      return <Text>{value}</Text>;
    default:
      return <TextInput {...cprops} />;
  }
};
