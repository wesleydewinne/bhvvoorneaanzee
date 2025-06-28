import "./Navigation.css"
import {NavLink} from "react-router-dom";


function Navigation() {
    return (
        <>
            <nav>
                <ul className="navigation-links">

                    {/*<li>*/}
                    {/*    <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}*/}
                    {/*             to="/training/bhv">BHV</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}*/}
                    {/*             to="/ontruimingsoefening">Ontruimingsoefening</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}*/}
                    {/*             to="/ehbo">EHBO</NavLink>*/}
                    {/*</li>*/}

                    {/*<li>*/}
                    {/*    <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}*/}
                    {/*             to="/workshops">Workshops</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}*/}
                    {/*             to="/webshop">Webshop</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}*/}
                    {/*             to="/allblogpost">Alle Blogs</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}*/}
                    {/*             to="/contact">Contact</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </nav>
        </>
    );
}

export default Navigation;