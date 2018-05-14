import React from "react";

export default function RemoveIrretrievably(props) {
    return <span className="button"
                 onClick={props.handleOnClick}>
        <i className="fas fa-times"/>
    </span>
}