import React from "react";

export default function MoveToBin(props) {
    return <span className="button"
                 onClick={props.handleOnClick}>
        <i className="fas fa-trash"/>
    </span>
}