import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (    
        <nav role="navigation" aria-labelledby="topnav">
            <Link to="/"><h3 className="linkStyle" id="topnav">Unique Brewery</h3></ Link>
            <ul className="nav-links">                
                <Link to="/search"><li  className="linkStyle">Search</li></Link>
            </ul>
        </nav>
    )
}

export default Nav;
