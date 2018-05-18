import React from "react";

export default props =>
    <div style={{display: 'inline-block', cursor: "pointer"}}>
        /<i onClick={props.handleOnClick}>
        {props.name}
        </i>
    </div>;