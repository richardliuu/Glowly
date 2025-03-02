import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.748817,
  lng: -73.985428,
};

const MapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Set the state to indicate the map is loaded
    setMapLoaded(true);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD6MbPdtDAbn4jLYpGuZPGTVYgOiyqGGwo">
      {mapLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default MapComponent;
