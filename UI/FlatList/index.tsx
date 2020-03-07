import React from "react";
import { FlatList, FlatListProps } from "react-native";

export interface IFlatListProps extends FlatListProps<any> {
  childRef?: any;
}

export default (props: IFlatListProps) => {
  return (
    <FlatList
      initialNumToRender={20}
      maxToRenderPerBatch={20}
      windowSize={20}
      removeClippedSubviews={true}
      {...props}
      ref={props.childRef}
    />
  );
};
