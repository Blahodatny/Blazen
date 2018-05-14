import React from "react";

export default function Download(props) {
    return <span className="button"
                 onClick={props.handleOnClick}>
        <i className="fas fa-download"/>
    </span>
}