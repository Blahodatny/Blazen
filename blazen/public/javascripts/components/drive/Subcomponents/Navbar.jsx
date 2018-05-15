import React from 'react';
import NavbarItem from './NavbarItem/NavbarItem.jsx';

export default function Navbar(props) {
    return <div>
        {props.navItems.map(item =>
            <NavbarItem
                key={item.name}
                handleOnClick={() => props.handleOnClick(item.name)}
                currentItem={props.currentItem}
                {...item}
            />)}
    </div>;
};