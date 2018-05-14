import React from "react";

export default function Restore(props) {
    return <span className="button"
                 onClick={props.handleOnClick}>
        <i className="fas fa-reply"/>
    </span>
}