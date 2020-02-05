import Theme from "@src/libs/theme";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import Carousel, {
  CarouselProps as OriginCarouselProps,
  Pagination as PaginationOrigin,
  PaginationProps
} from "react-native-snap-carousel";
import View from "../View";

export interface CarouselProps extends OriginCarouselProps<any> {
  data: any[];
  children?: any;
  style?: any;
}

export default (props: CarouselProps) => {
  const { style, data, children } = props;
  const carouselProps: any = { ...props };
  delete carouselProps.style;
  delete carouselProps.data;
  const ref = useRef(null);
  const dim = Dimensions.get("window");
  const [meta, setMeta] = useState({
    activeSlide: 0,
    dataLength: 0,
    data: []
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const nmeta = _.cloneDeep(meta);
      nmeta.data = data;
      nmeta.dataLength = data.length;
      setMeta(nmeta);
    }
  }, [data]);

  const childrenWithProps = React.Children.map(children, child => {
    return renderChild(child, meta);
  });

  return (
    <View style={style}>
      <Carousel
        data={meta.data}
        ref={ref}
        itemWidth={dim.width - 50}
        sliderWidth={dim.width}
        layout={"default"}
        containerCustomStyle={{
          overflow: "visible"
        }}
        {...carouselProps}
        onSnapToItem={index => {
          meta.activeSlide = index;
          carouselProps.onSnapToItem && carouselProps.onSnapToItem(index);
        }}
      />
      {childrenWithProps}
    </View>
  );
};

export const Pagination = (props: PaginationProps) => {
  return (
    <PaginationOrigin
      dotsLength={0}
      activeDotIndex={0}
      containerStyle={{
        paddingHorizontal: 0,
        paddingVertical: 0
      }}
      dotStyle={{
        height: 8,
        width: 8,
        borderRadius: 20,
        backgroundColor: Theme.UIColors.primary
      }}
      dotContainerStyle={{
        marginLeft: 3,
        marginRight: 3
      }}
      inactiveDotOpacity={0.3}
      inactiveDotScale={1}
      {...props}
    />
  );
};

const renderChild = (child: any, meta: any) => {
  if (child.type === Pagination) {
    let cprops = {
      dotsLength: meta.dataLength,
      activeDotIndex: meta.activeSlide
    };
    return React.cloneElement(child, {
      ...cprops,
      ...child.props
    });
  } else {
    const childrenRaw = _.get(child, "props.children");
    const hasChildren = !!childrenRaw;
    if (!hasChildren) {
      return child;
    } else {
      const children = Array.isArray(childrenRaw) ? childrenRaw : [childrenRaw];
      return React.cloneElement(child, {
        ...child.props,
        children: React.Children.map(children, el => renderChild(el, meta))
      });
    }
  }
};
