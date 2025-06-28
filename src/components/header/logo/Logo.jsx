import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image/logo.png';
function Logo() {
    return (
        <Link to="/">
            <img src={logo} alt="Home Logo" style={{ cursor: 'pointer'}} />
        </Link>
    );
}

export default Logo;