import React from "react";
import SmokeLottieOverlay from "./SmokeLottieOverlay";
import serverImg from "../../assets/image/notfound/server.png";
import "./NotFoundPage.css";
import {Link} from "react-router-dom";
import nooduitgangImg from '../../assets/image/notfound/nooduitgang.webp';
import Alarm from "./Alarm";


function NotFoundPage() {
    return (
        <div className="notfound-wrapper">

            <Alarm />
            <div className="content-server-wrapper"> {/* ✅ Toegevoegd */}
                <div className="content-container">
                    <div className="notfound-content">
                        <h1>Oei 404, ons server staat in brand!</h1>
                        <p>Onze BHV’er is onderweg met deze blusser…</p>
                        <p>Snel naar buiten via de nooduitgang! Klik erop en je bent veilig!</p>
                        <div style={{height: "50px", display: "inline-block"}}>
                            <Link to="/" style={{display: "inline-block", height: "100%"}}>
                                <img
                                    src={nooduitgangImg}
                                    alt="Link button"
                                    style={{height: "100%", width: "auto", display: "block", marginTop: "30px"}}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="server-container">
                    <div className="smoke-wrapper">
                        <SmokeLottieOverlay/>
                    </div>
                    <img src={serverImg} alt="Server in brand" className="server-img"/>
                </div>
            </div>
            {/* ✅ Gesloten */}
        </div>
    );
}

export default NotFoundPage;
