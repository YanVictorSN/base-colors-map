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
    <main style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      <div style={{
        height: "10vh", width: "100%", display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <img src="/logo.png" style={{ height: '5vh', width: 'auto' }} alt="" />
      </div>
      <div style={{ height: 'calc(100vh - 10vh)', width: '100vw', overflow: 'hidden', position: 'relative' }}>
        <MapContainer
          center={[24.071521, 9.615584725366856]}
          zoom={2}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', backgroundColor: "white" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            minZoom={2}
            maxZoom={18}
          />
          <MarkerClusterGroup>
            {transformedData.map((item, index) => (
              <Marker key={index} position={[item.latitude, item.longitude]} icon={customIcon}>
                <Popup>{item.name}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </main>
  );
}

export default App;
