import Theme from "../../appearance/theme";
import { randomStr } from "../../utils";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import Carousel, {
  CarouselProps as OriginCarouselProps,
  Pagination as PaginationOrigin,
  PaginationProps as PaginationPropsOrigin
} from "react-native-snap-carousel";

export interface CarouselProps extends OriginCarouselProps<any> {
  children?: any;
}

export default observer((props: CarouselProps) => {
  const { children, data } = props;
  const carouselProps: any = { ...props };
  const ref = useRef(null);
  const dim = Dimensions.get("window");
  const meta = useObservable({
    activeSlide: 0,
    dataLength: data.length
  });
  const onSnapItem = (index: number) => {
    meta.activeSlide = index;
    carouselProps.onSnapToItem && carouselProps.onSnapToItem(index);
  };

  useEffect(() => {
    meta.dataLength = data.length;
  }, [data]);

  return (
    <>
      <Carousel
        ref={ref}
        itemWidth={dim.width - 50}
        sliderWidth={dim.width}
        layout={"default"}
        containerCustomStyle={{
          overflow: "visible"
        }}
        {...carouselProps}
        onSnapToItem={onSnapItem}
      />
      {!!children &&
        (Array.isArray(children) ? (
          children.map(child => {
            return <RenderChild key={randomStr()} child={child} meta={meta} />;
          })
        ) : (
          <RenderChild child={children} meta={meta} />
        ))}
    </>
  );
});

export const Pagination = observer((props: any | PaginationPropsOrigin) => {
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
});

const RenderChild = observer(({ child, meta }: any) => {
  if (child.type === Pagination) {
    let cprops = {
      dotsLength: meta.dataLength,
      activeDotIndex: meta.activeSlide
    };
    const Component = child.type;
    return <Component {...child.props} {...cprops} />;
  } else if (!child || !child.type || !child.props) {
    return child;
  } else {
    const Component = child.type;
    return <Component {...child.props} />;
  }
});
