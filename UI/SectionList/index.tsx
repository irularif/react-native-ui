import React from "react";
import { SectionList, SectionListProps } from "react-native";

export default (props: SectionListProps<any>) => {
  return (
    <SectionList
      initialNumToRender={20}
      maxToRenderPerBatch={50}
      windowSize={20}
      removeClippedSubviews={true}
      {...props}
    />
  );
};
