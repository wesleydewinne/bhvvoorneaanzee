// src/components/TileSection.jsx
import React from "react";
import Tile from "../../tile/Tile.jsx";
import "./TileSection.css";

function TileSection({ tiles = [], direction = "row" }) {
    return (
        <section className="tile-section">
            <div className={`inner-container-tile ${direction === "row-reverse" ? "inner-container-tile-reverse" : ""}`}>
                {tiles.map((tile, index) => (
                    <Tile
                        key={index}
                        title={tile.title}
                        subtitle1={tile.subtitle1}
                        subtitle2={tile.subtitle2}
                        description={tile.description}
                        imageUrl={tile.imageUrl}
                        altTitle={tile.altTitle}
                    />
                ))}
            </div>
        </section>
    );
}

export default TileSection;
