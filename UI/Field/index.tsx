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
  readonly?: boolean;
  onChange?: (value) => void;
}

export default (props: IFieldProps) => {
  const { label, isValid, readonly, onChange } = props;
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
  const handleOnChange = value => {
    onChange && onChange(value);
    props.setValue(value);
  };
  const childprops = _.cloneDeep(_.get(props, "children.props", {}));
  childprops.value = _.get(props, "value", "");
  childprops.onChangeText = handleOnChange;
  childprops.readonly = !readonly;
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
