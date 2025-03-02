import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1400px',
  height: '450px',
};

const center = {
  lat: 43.6406,
  lng: -79.3757,
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
