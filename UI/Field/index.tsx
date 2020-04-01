import _ from "lodash";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextStyle } from "react-native";
import Theme from "../../theme";
import Input from "../Input";
import RadioGroup from "../RadioGroup";
import Select from "../Select";
import Text from "../Text";

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
  onChange?: (value: any) => void;
}

export default (props: IFieldProps) => {
  const { label, isValid, readonly, onChange } = props;
  const [meta, setMeta] = useState({
    error: false,
    init: true
  });
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

  const Component = props.children.type;
  const childprops = _.clone(_.get(props, "children.props", {}));
  childprops.readonly = readonly;

  const handleOnChange = (value: any) => {
    props.onChange && props.onChange(value);
    props.setValue(value);
  };
  switch (Component) {
    case Select:
      childprops.value = _.get(props, "value", "");
      childprops.onChangeText = handleOnChange;
      childprops.searchProps = {
        placeholder: "Search " + props.label
      };
      break;
    case RadioGroup:
      childprops.value = _.get(props, "value", "");
      childprops.onChangeText = handleOnChange;
      break;
    case Input:
      childprops.value = _.get(props, "value", "");
      childprops.onChangeText = handleOnChange;
      break;
  }

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
