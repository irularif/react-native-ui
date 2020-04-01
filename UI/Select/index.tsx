import React, { useEffect } from "react";
import { ViewStyle, TextStyle, StyleSheet } from "react-native";
import Theme from "../../appearance/Theme";
import Button, { IButtonProps } from "../Button";
import Text, { ITextProps } from "../Text";
import { useObservable, observer } from "mobx-react-lite";
import Input, { IInputProps } from "../Input";
import Modal from "../Modal";
import View, { IViewProps } from "../View";
import TopBar from "../TopBar";
import FlatList, { IFlatListProps } from "../FlatList";
import _ from "lodash";
import Icon from "../Icon";
import { fuzzyMatch, randomStr } from "../../utils";

interface IItemProps {
  label: any;
  value: any;
}

export interface ISelectProps {
  items: (IItemProps | String | any)[];
  value?: any;
  onSelect?: (item) => void;
  onChangeText?: (value) => void;
  labelPath?: any;
  valuePath?: any;
  readonly?: boolean;
  style?: ViewStyle;
  labelProps?: ITextProps;
  searchProps?: IInputProps;
  listProps?: IFlatListProps;
  itemProps?: IButtonProps;
}

export const formatedItems = (props: ISelectProps | any) => {
  const labelPath = _.get(props, "labelPath", "label");
  const valuePath = _.get(props, "valuePath", "value");
  const items = _.get(props, "items", []);

  return items.map(item => {
    return {
      label: item[labelPath],
      value: item[valuePath]
    };
  });
};

export default observer((props: ISelectProps) => {
  const { style, labelProps, readonly, items, value } = props;
  const meta = useObservable({
    selectedItem: {} as IItemProps,
    openSelect: false,
    search: "",
    items: []
  });
  const baseStyle: ViewStyle = {
    margin: 4,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Theme.UIColors.primary,
    minHeight: 44,
    height: 44,
    minWidth: 120,
    maxHeight: 240
  };
  const cstyle = StyleSheet.flatten([baseStyle, style]);
  const baseLabelStyle: TextStyle = {
    fontSize: Theme.UIFontSize,
    fontFamily: Theme.UIFontFamily,
    color: "#000",
    flexWrap: "nowrap",
    flexShrink: 1
  };
  const handleSelect = () => {
    if (items.length === 0) alert("No item to display.");
    meta.openSelect = !meta.openSelect;
  };
  useEffect(() => {
    meta.items = formatedItems(props);
  }, [items]);
  useEffect(() => {
    meta.selectedItem = meta.items.find(x => x.value === value);
  }, [value]);
  return (
    <>
      <Button
        mode={"outlined"}
        style={cstyle}
        disabled={readonly}
        onPress={handleSelect}
      >
        <Text
          style={baseLabelStyle}
          ellipsizeMode={"tail"}
          numberOfLines={1}
          {...labelProps}
        >
          {_.get(meta, "selectedItem.label", "")}
        </Text>
        <Icon
          name={"ios-arrow-down"}
          size={18}
          style={{
            margin: 5,
            alignSelf: "center"
          }}
        />
      </Button>
      <SelectComponent meta={meta} selectProps={props} />
    </>
  );
});

const SelectComponent = observer((props: any) => {
  const { meta, selectProps } = props;
  const { listProps, searchProps } = selectProps;
  const handleReqClose = () => {
    meta.openSelect = !meta.openSelect;
  };
  const renderItem = ({ item }: any) => {
    return <RenderItem item={item} meta={meta} selectProps={selectProps} />;
  };
  const itemSperator = () => (
    <View
      style={{
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "#e4e4e4",
        borderWidth: 0
      }}
    />
  );
  const searchStyle: TextStyle = {
    margin: 0,
    backgroundColor: "#fff"
  };
  const handleSearchInput = value => {
    meta.search = value;
  };
  return (
    <Modal
      transparent={false}
      visible={meta.openSelect}
      onRequestClose={handleReqClose}
    >
      <TopBar backButton actionBackButton={handleReqClose}>
        <Input
          style={searchStyle}
          autoFocus={true}
          {...searchProps}
          value={meta.search}
          onChangeText={handleSearchInput}
        />
      </TopBar>
      <FlatList
        {...listProps}
        data={meta.items.filter(item => {
          if (!!meta.search)
            return fuzzyMatch(
              meta.search.toLowerCase(),
              item.label.toLowerCase()
            );
          return true;
        })}
        renderItem={renderItem}
        keyExtractor={() => randomStr()}
        ItemSeparatorComponent={itemSperator}
        keyboardShouldPersistTaps={"handled"}
      />
    </Modal>
  );
});

const RenderItem = (props: any) => {
  const { item, meta, selectProps } = props;
  const labelStyle = {
    color: "#000"
  };
  const itemStyle: ViewStyle = {
    justifyContent: "flex-start"
  };
  const handleSelect = () => {
    meta.selectedItem = item;
    selectProps.onSelect && selectProps.onSelect(item);
    selectProps.onChangeText && selectProps.onChangeText(item.value);
    meta.openSelect = !meta.openSelect;
  };
  return (
    <Button
      style={itemStyle}
      mode="clean"
      {...selectProps.itemProps}
      onPress={handleSelect}
    >
      <Text style={labelStyle}>{item.label}</Text>
    </Button>
  );
};
