import React, { useState } from "react";
import View, { IViewProps } from "../View";
import _ from "lodash";
import { randomStr } from "../../util/index";
import Field from "../Field";
import Button from "../Button";

export interface IFromProps extends IViewProps {
  data?: any;
  style?: any;
  setValue?: (value, path) => void;
  onSubmit?: (data) => void;
  children?: any;
}

export default (props: IFromProps) => {
  const { children, data, setValue, style, onSubmit } = props;
  const [validate, setValidate] = useState({
    count: 0,
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
            validate={validate}
            setValidate={setValidate}
            onSubmit={onSubmit}
          />
        ))
      ) : (
        <RenderChild
          data={data}
          setValue={setValue}
          child={children}
          key={randomStr()}
          validate={validate}
          setValidate={setValidate}
          onSubmit={onSubmit}
        />
      )}
    </View>
  );
};

const RenderChild = (props: any) => {
  const { data, child, setValue, validate, setValidate, onSubmit } = props;
  if (child.type === Field) {
    let custProps: any = child.props;
    let val = true;
    if (child.props.isRequired) {
      val = !!_.get(data, child.props.path, null);
    }

    validate.fields[child.props.path] = val;
    // setValidate(_.cloneDeep(validate));
    const defaultSetValue = (value: any, path: any) => {
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
      isValid: validate.fields[child.props.path],
      value: _.get(data, child.props.path),
      setValue: (value: any) => defaultSetValue(value, child.props.path)
    };
    const Component = child.type;
    return <Component {...custProps} />;
  } else if (child.type === Button) {
    let custProps: any = child.props;
    if (child.props.type === "Submit") {
      const onPress = e => {
        let i = 0;
        Object.keys(validate.fields).map(e => {
          if (!validate.fields[e]) {
            ++i;
          }
        });
        validate.count = i;
        // setValidate(_.cloneDeep(validate));
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
    const children = child.props.children;
    const Component = child.type;
    return (
      <Component {...child.props}>
        {Array.isArray(children) ? (
          children.map(el => (
            <RenderChild
              data={data}
              setValue={setValue}
              child={el}
              key={randomStr()}
              validate={validate}
              setValidate={setValidate}
              onSubmit={onSubmit}
            />
          ))
        ) : (
          <RenderChild
            data={data}
            setValue={setValue}
            child={children}
            key={randomStr()}
            validate={validate}
            setValidate={setValidate}
            onSubmit={onSubmit}
          />
        )}
      </Component>
    );
  }
};
