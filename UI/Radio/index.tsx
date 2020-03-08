import Theme from "@src/libs/theme";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import Button from "../Button";
import Icon from "../Icon";

export type IRadioModeType = "default" | "checkbox";

export interface IRadioProps {
  label?: any;
  value?: any;
  checked?: boolean;
  onChecked?: (value: boolean) => void;
  readonly?: boolean;
  mode?: IRadioModeType;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export default observer((props: IRadioProps) => {
  const { label, onChecked, checked, mode, style, labelStyle } = props;
  const baseStyle: ViewStyle = {
    justifyContent: "center",
    padding: 4,
    paddingLeft: 4,
    paddingRight: 8,
    minHeight: 35
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);
  const baseLabelStyle: TextStyle = {
    fontFamily: Theme.UIFontFamily,
    fontSize: Theme.UIFontSize
  };
  const clabelstyle = StyleSheet.flatten([baseLabelStyle, labelStyle]);
  const handleCheck = () => {
    onChecked && onChecked(!checked);
  };
  return (
    <Button mode={"clean"} style={cstyle} onPress={handleCheck}>
      <Icon
        name={checked ? "md-radio-button-on" : "md-radio-button-off"}
        size={20}
        style={{
          padding: 4,
          paddingBottom: 2
        }}
      />
      <Text style={clabelstyle}>{label}</Text>
    </Button>
  );
});
