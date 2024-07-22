// eslint-disable-next-line no-unused-vars
import React from "react";
import GoogleMapReact from "google-map-react";
import "./style.css";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

const location = [
  {
    address: "Departamento de Ciência de Computadores FCUP",
    lat: 41.15245824482038,
    lng: -8.64076278993112,
  },
  {
    address: "Departamento de Matemática FCUP",
    lat: 41.15203617736515,
    lng: -8.635238372627315,
  },
];

// eslint-disable-next-line react/prop-types
const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon style={{color: 'rgba(160, 89, 190, 0.9)'}} icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const Map = () => {
  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us</h2>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyARDs4b3QSh9XNASXEeTFS5DjbSyUv2YE0" }}
          defaultCenter={location[0]}
          defaultZoom={12}>
          {location.map((loc, index) => (
            <LocationPin 
              key={index}
              lat={loc.lat}
              lng={loc.lng}
              text={loc.address}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
