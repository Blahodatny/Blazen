import React from "react";

export default function Favour(props) {
    return <span className="button"
                 onClick={props.handleOnClick}>
        <i className={props.favourite ? "fas fa-star" : "far fa-star"}/>
    </span>
}