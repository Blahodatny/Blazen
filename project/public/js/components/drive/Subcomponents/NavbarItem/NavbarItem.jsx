import React from "react";

export default function NavbarItem(props) {
    return <div
        className={
            props.currentItem === props.name ?
                "active" : null
        }
        onClick={props.handleOnClick}>
        <i className={props.name}
           style={{fontSize: '2em'}}/>
    </div>
};