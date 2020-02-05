import React from "react";
import View, { IViewProps } from "../View";

export interface IContainerProps extends IViewProps {}

export default (props: IContainerProps) => {
  return (
    <View
      type={"KeyboardAvoidingView"}
      style={{
        flexGrow: 1,
        flexShrink: 1
      }}
    >
      <View
        type={"ScrollView"}
        style={{
          flexGrow: 1,
          flexShrink: 1
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        {...props}
      />
    </View>
  );
};
