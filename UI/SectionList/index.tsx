import React from "react";
import { SectionList, SectionListProps } from "react-native";

export interface ISectionListProps extends SectionListProps<any> {}

export default (props: ISectionListProps) => {
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
