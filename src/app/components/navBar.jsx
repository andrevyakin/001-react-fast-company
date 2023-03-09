import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);
    const menuItem = {
        Main: '/',
        Login: '/login',
        Users: '/users'
    };
    return (
        <ul className='nav nav-pills'>
            {Object.entries(menuItem).map((item, index) => (
                <li
                    key={index}
                    className='nav-item'
                >
                    <Link className={
                        'nav-link ' + (
                            url === item[1]
                                ? 'active'
                                : '')}
                          aria-current='page' to={item[1]}
                    >
                        <h3> {item[0]} </h3>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavBar;
