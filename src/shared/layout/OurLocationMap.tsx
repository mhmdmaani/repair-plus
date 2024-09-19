import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from '@/api/settings';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '20px',
};
const center = {
  lat: 58.29419460462419,
  lng: 12.317553455341615,
};

export default function OurLocationMap() {
  const { isLoaded } = useJsApiLoader({
    id: '4a1ae81e8630df8f',
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={20}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: true,
        mapTypeId: 'satellite',
      }}
    >
      <></>
    </GoogleMap>
  );
}
