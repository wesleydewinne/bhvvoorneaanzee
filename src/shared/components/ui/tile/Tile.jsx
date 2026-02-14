import './Tile.css';

function Tile({ title, subtitle1, subtitle2, description, imageUrl, altTitle }) {
    return (
        <div className="tile">
            {imageUrl && <img src={imageUrl} alt={altTitle} />}
            <div className="tile-content">
                <h2 className="title-tile">{title}</h2>
                <i>{subtitle1} <br /> {subtitle2}</i>
                <p className="text-tile">{description}</p>
            </div>
        </div>
    );
}

export default Tile;