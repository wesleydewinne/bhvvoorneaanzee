import './Header.css';
import Navigation from "./navigation/Navigation.jsx";
import Logo from './logo/Logo.jsx';

function Header() {

    return (
        <>

            <header className="inner-container">
                <Logo />
                <Navigation />
                {/*<LoginRegister />*/}
            </header>

        </>
    );
}

export default Header;