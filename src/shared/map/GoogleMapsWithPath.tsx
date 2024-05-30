'use client';
import { GOOGLE_API_KEY } from '@/api/settings';
import { useStateValue } from '@/providers/StateContext';
import { useTheme } from '@mui/material';

import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import React, { useEffect } from 'react';

export default function GoogleMapsWithPath({
  waypoints,
  start,
  end,
  containerStyle = {
    height: '100%',
    width: '100%',
  },
  directions,
  setDirections,
}: {
  waypoints: any[];
  start: any;
  end: any;
  containerStyle?: React.CSSProperties;
  directions?: any;
  setDirections?: (directions: any) => void;
}) {
  const { state, dispatch } = useStateValue();
  const theme = useTheme();
  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  const [center, setCenter] = React.useState<any>({
    lat: 52.481014390888724,
    lng: -1.917534859491033,
  });

  useEffect(() => {
    if (start) {
      setCenter(start);
    }
    if (scriptLoaded) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints?.map((waypoint) => ({
            location: waypoint,
            stopover: true,
          })),
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            //@ts-ignore
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [scriptLoaded, start, end, waypoints]);

  const darkModeStyle = [
    // Add your dark mode style here
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];

  const lightModeStyle = [
    // Add your light mode style here
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

  const { isLoaded } = useJsApiLoader({
    id: '4a1ae81e8630df8f',
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!

    setScriptLoaded(true);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false, // Hides the street view control
        mapTypeControl: false, // Hides the map type control
        scaleControl: false, // Hides the scale control
        fullscreenControl: false, // Hides the fullscreen control
        styles: state.mode === 'dark' ? darkModeStyle : lightModeStyle,
        zoomControl: false, // Hides the zoom control
      }}
    >
      <Marker
        position={start}
        icon={{
          url: './pickup.png',
          scaledSize: new window.google.maps.Size(40, 40),
          size: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
        }}
        title='start point'
      />
      <Marker
        position={end}
        icon={{
          url: './dropoff.png',
          scaledSize: new window.google.maps.Size(40, 40),
          size: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
        }}
        title='start point'
      />
      {
        // Add your waypoints markers here
        waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            position={waypoint}
            label={{
              text: (index + 1).toString(),
              color: waypoint?.type === 'pickup' ? 'green' : 'red',
            }}
            icon={{
              url:
                waypoint?.type === 'pickup'
                  ? './pickupPoint.png'
                  : './dropoffPoint.png',
              scaledSize: new window.google.maps.Size(40, 40),
              size: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, -4),
            }}
          />
        ))
      }
      {/* Child components, such as markers, info windows, etc. */}
      <DirectionsRenderer
        directions={directions}
        options={{
          markerOptions: {
            visible: false,
          },
          polylineOptions: {
            strokeColor: theme.palette.primary.main, // Set your desired color here
            strokeOpacity: 0.8,
            strokeWeight: 6,
          },
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}
