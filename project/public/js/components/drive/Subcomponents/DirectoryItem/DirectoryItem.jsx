import React from "react";

export default function DirectoryItem(props) {
    return <div style={{display: 'inline-block', cursor: "pointer"}}>
        /<i onClick={props.handleOnClick}>
        {props.name}
    </i>
    </div>
};