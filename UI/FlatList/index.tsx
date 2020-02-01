import React from "react";
import { FlatList, FlatListProps } from "react-native";

export default (props: FlatListProps<any>) => {
  return (
    <FlatList
      initialNumToRender={20}
      maxToRenderPerBatch={100}
      windowSize={20}
      removeClippedSubviews={true}
      {...props}
    />
  );
};
