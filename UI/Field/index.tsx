import React, { useState, useEffect } from "react";
import _ from "lodash";
import Text from "../Text";
import Theme from "../../theme";
import { StyleSheet, TextStyle } from "react-native";

interface IFieldProps {
  label?: string;
  path?: string;
  setValue?: any;
  value?: any;
  children?: any;
  style?: any;
  isRequired?: boolean;
  isValid?: boolean;
}

export default (props: IFieldProps) => {
  const { label, isValid } = props;
  const [meta, setMeta] = useState({
    error: false,
    init: true
  });
  const Component = props.children.type;
  const defLabelStyle: TextStyle = {
    fontSize: Theme.UIFontSize,
    color: "#757575",
    marginBottom: 5
  };
  const labelStyle = StyleSheet.flatten([defLabelStyle, Theme.UILabel]);
  const defErrorLabelStyle: TextStyle = {
    fontSize: 12,
    color: Theme.UIColors.danger,
    marginBottom: 5
  };
  const errorLabelStyle = StyleSheet.flatten([
    defErrorLabelStyle,
    Theme.UILabel
  ]);
  const childprops = _.cloneDeep(_.get(props, "children.props", {}));
  childprops.value = _.get(props, "value", "");
  childprops.onChangeText = (value: any) => {
    props.setValue(value);
  };

  useEffect(() => {
    if (!meta.init) {
      meta.error = !isValid;
      setMeta(_.cloneDeep(meta));
    }
  }, [isValid]);
  return (
    <>
      <Text style={labelStyle}>{label}</Text>
      <Component {...childprops} />
      {meta.error && <Text style={errorLabelStyle}>Field is required.</Text>}
    </>
  );
};
