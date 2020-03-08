import _ from "lodash";
import React, { useEffect, useRef } from "react";
import MapViewNative, {
  MapViewProps as MapViewPropsOrigin,
  Marker as MarkerOrigin,
  MarkerProps as MarkerPropsOrigin
} from "react-native-maps";
import View from "../View";

export interface IMapViewProps extends MapViewPropsOrigin {
  location?: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  markers?: MarkerProps[];
  markerIds?: string[];
  children?: any;
  fitToSuppliedMarkers?: boolean;
  onMapViewReady?: (status: boolean) => void;
}

export default (props: IMapViewProps) => {
  const { style, location, fitToSuppliedMarkers, markerIds } = props;
  const mapProps = { ...props };
  delete mapProps.markers;
  delete mapProps.location;
  const ref = useRef(null);

  useEffect(() => {
    if (
      fitToSuppliedMarkers !== false &&
      ref.current !== null &&
      Array.isArray(markerIds) &&
      markerIds.length > 0
    ) {
      setTimeout(() => {
        ref.current.fitToSuppliedMarkers(markerIds);
      });
    }
  }, [markerIds]);

  const defaultRegion = {
    latitude: -7.2573058,
    longitude: 112.7526189,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00922
  };

  const region = _.merge(defaultRegion, location);

  const baseMapStyle = {
    flexGrow: 1,
    minWidth: 200,
    minHeight: 200
  };

  return (
    <View style={style}>
      <MapViewNative
        ref={ref}
        style={baseMapStyle}
        {...mapProps}
        region={region}
      ></MapViewNative>
    </View>
  );
};

export interface MarkerProps extends MarkerPropsOrigin {
  children?: any;
}

export const Marker = (props: MarkerProps) => {
  return <MarkerOrigin {...props} />;
};
