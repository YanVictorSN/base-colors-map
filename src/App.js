import './App.css';

import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from "react-leaflet";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/output_data.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const transformedData = data.map(item => ({
    name: item[0],
    description: item[1],
    latitude: parseFloat(item[3]),
    longitude: parseFloat(item[4])
  })).filter(item => !isNaN(item.latitude) && !isNaN(item.longitude));

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38]
  })
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {transformedData.map((item, index) => (
          <Marker key={index} position={[item.latitude, item.longitude]} icon={customIcon}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default App;
