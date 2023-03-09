import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
    const menuItem = ['Main', 'Login', 'Users'];
    return (
        <ul className='nav'>
            {menuItem.map((item, index) => (
                <li
                    key={index}
                    className='nav-item'
                >
                    <Link className='nav-link' aria-current='page' to={item === 'Main'
                        ? '/'
                        : `${item}`}>
                        <h3> {item} </h3>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavBar;
