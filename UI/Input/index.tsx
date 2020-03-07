import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps as OriginTextInputProps,
  TextStyle
} from "react-native";
import Text from "../Text";
import Theme from "../../theme";

export type InputType =
  | "text"
  | "number"
  | "password"
  | "decimal"
  | "multiline"
  | "currency";

export interface IInputProps extends OriginTextInputProps {
  type?: InputType;
  onChangeText?: (value) => void;
  readonly?: boolean;
}
export default (props: IInputProps) => {
  const { type, style, value, onChangeText, readonly } = props;
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

  let tprops: OriginTextInputProps = {};
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
    margin: 4,
    padding: 10,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Theme.UIColors.primary,
    minHeight: 44,
    minWidth: 120,
    fontSize: Theme.UIFontSize,
    fontFamily: Theme.UIFontFamily,
    maxHeight: 240
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);

  const cprops: OriginTextInputProps = {
    returnKeyType: "next",
    ...props,
    ...tprops,
    onChangeText: onChange,
    style: cstyle,
    editable: readonly
  };
  switch (typeof value) {
    case "object":
      return <Text>{value}</Text>;
    default:
      return <TextInput {...cprops} />;
  }
};
