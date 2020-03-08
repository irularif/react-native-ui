import Theme from "@src/libs/theme";
import { randomStr } from "@src/libs/util";
import _ from "lodash";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Radio, { IRadioModeType } from "../Radio";
import { formatedItems } from "../Select";
import View from "../View";

interface IItemProps {
  label: any;
  value: any;
}

export interface IRadioGroupProps {
  mode?: IRadioModeType;
  value?: any;
  onChangeText?: (value: any) => void;
  style?: any;
  children?: any;
  items?: (IItemProps | String | any)[];
  readonly?: boolean;
}

export default observer((props: IRadioGroupProps) => {
  const { style, children, items, value, readonly } = props;
  const meta = useObservable({
    items: []
  });
  const baseStyle: ViewStyle = {
    margin: 4,
    alignItems: "center",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Theme.UIColors.primary,
    minHeight: 44,
    height: 44,
    minWidth: 120,
    maxHeight: 240,
    opacity: readonly ? 0.7 : 1,
    flexDirection: "row"
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);
  useEffect(() => {
    meta.items = formatedItems(props);
  }, [items]);
  return (
    <View style={cstyle}>
      {meta.items.length > 0 ? (
        meta.items.map(item => {
          const handleChecked = value => {
            if (!!value) props.onChangeText && props.onChangeText(item.value);
          };
          return (
            <Radio
              key={randomStr()}
              label={item.label}
              value={item.value}
              checked={item.value === value}
              onChecked={handleChecked}
              readonly={readonly}
            />
          );
        })
      ) : Array.isArray(children) ? (
        children.map(el => {
          return (
            <RenderChild key={randomStr()} child={el} radioProps={props} />
          );
        })
      ) : (
        <RenderChild child={children} radioProps={props} />
      )}
    </View>
  );
});

const RenderChild = observer((props: any) => {
  const { child, radioProps } = props;
  const { onChangeText, value } = radioProps;
  if (Array.isArray(child)) {
    return child.map(el => {
      <RenderChild child={el} radioProps={radioProps} />;
    });
  } else if (child.type === Radio) {
    const Component = child.type;
    const childProps = _.clone(child.props);
    let checked = false;
    if (!!childProps.value)
      checked = childProps.value.toLowerCase() === value.toLowerCase();
    else if (!!childProps.label)
      checked = childProps.label.toLowerCase() === value.toLowerCase();
    childProps.checked = checked;
    childProps.onChecked = value => {
      if (!!value)
        onChangeText && onChangeText(childProps.value || childProps.label);
    };
    return <Component {...childProps} />;
  } else if (!child || !child.type || !child.props) {
    return child;
  } else {
    const Component = child.type;
    const children = child.props.children;
    return (
      <Component>
        {Array.isArray(children) ? (
          children.map(el => {
            return <RenderChild child={el} radioProps={props} />;
          })
        ) : (
          <RenderChild child={children} radioProps={props} />
        )}
      </Component>
    );
  }
});
