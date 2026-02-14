// src/components/home/CoverageArea.jsx

import React from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CoverageArea.css";

const verzorgingsgebied = [
    //hoogte // lengte
    [51.9800, 4.0750],  // goed Hoek van Holland
    [51.9890, 3.9999],
    [51.9640, 3.9646], // goed Maasvlakte boven
    [51.8000, 3.8300],  // goed ouddorp

];

const CoverageArea = () => {
    return (
        <>
            <h2 className="coverage-title">Ons Verzorgingsgebied</h2>
            <p className="coverage-subtext">
                Wij verzorgen trainingen in Voorne aan Zee en omliggende gemeenten.
            </p>
            <div className="coverage-map-wrapper">
                <MapContainer
                    center={[51.85, 4.15]}
                    zoom={11}
                    scrollWheelZoom={false}
                    className="coverage-map"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polygon positions={verzorgingsgebied} pathOptions={{ color: "red" }} />
                </MapContainer>
            </div>
        </>
    );
};

export default CoverageArea;
