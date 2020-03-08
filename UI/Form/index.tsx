import React, { useState, useEffect } from "react";
import View, { IViewProps } from "../View";
import _ from "lodash";
import { randomStr } from "../../util/index";
import Field from "../Field";
import Button from "../Button";
import { useObservable, observer } from "mobx-react-lite";
import { toJS } from "mobx";

export interface IFromProps extends IViewProps {
  data?: any;
  style?: any;
  setValue?: (value, path) => void;
  onSubmit?: (data) => void;
  children?: any;
}

export default observer((props: IFromProps) => {
  const { children, data, setValue, style, onSubmit } = props;
  const meta = useObservable({
    fields: {}
  });
  return (
    <View style={style}>
      {Array.isArray(children) ? (
        children.map(el => (
          <RenderChild
            data={data}
            setValue={setValue}
            child={el}
            key={randomStr()}
            onSubmit={onSubmit}
            meta={meta}
          />
        ))
      ) : (
        <RenderChild
          data={data}
          setValue={setValue}
          child={children}
          key={randomStr()}
          onSubmit={onSubmit}
          meta={meta}
        />
      )}
    </View>
  );
});

const RenderChild = observer((props: any) => {
  const { data, child, setValue, onSubmit, meta } = props;
  if (Array.isArray(child)) {
    return child.map(el => (
      <RenderChild
        data={data}
        setValue={setValue}
        child={el}
        key={randomStr()}
        onSubmit={onSubmit}
        meta={meta}
      />
    ));
  } else if (child.type === Field) {
    let custProps: any = child.props;
    let val = true;
    if (custProps.isRequired) {
      val = !!_.get(data, custProps.path, null);
    }

    meta.fields[custProps.path] = val;
    const defaultSetValue = (value: any, path: any) => {
      meta.fields[path] = !!value;
      if (!!setValue) setValue(value, path);
      else {
        if (data) {
          _.set(data, path, value);
        } else {
          alert(`Failed to set value to ${path}: Form data props is undefined`);
        }
      }
    };
    custProps = {
      ...custProps,
      isValid: meta.fields[custProps.path],
      value: _.get(data, custProps.path, ""),
      setValue: (value: any) => defaultSetValue(value, custProps.path)
    };
    const Component = child.type;
    return <Component {...custProps} />;
  } else if (child.type === Button) {
    let custProps: any = child.props;
    if (custProps.type == "Submit") {
      const onPress = e => {
        let i = 0;
        Object.keys(meta.fields).map(e => {
          if (!meta.fields[e]) {
            ++i;
          }
        });
        if (i === 0) {
          onSubmit && onSubmit(data);
        }
      };
      custProps = {
        ...custProps,
        onPress: onPress
      };
    }
    const Component = child.type;
    return <Component {...custProps} />;
  } else if (!child || !child.type || !child.props) {
    return child;
  } else {
    const Component = child.type;
    const children = child.props.children;
    return (
      <Component {...child.props}>
        {Array.isArray(children) ? (
          children.map(el => (
            <RenderChild
              data={data}
              setValue={setValue}
              child={el}
              key={randomStr()}
              onSubmit={onSubmit}
              meta={meta}
            />
          ))
        ) : (
          <RenderChild
            data={data}
            setValue={setValue}
            child={children}
            key={randomStr()}
            onSubmit={onSubmit}
            meta={meta}
          />
        )}
      </Component>
    );
  }
});
