import React from "react";

export default function ItemIcon(props) {
    return <i style={{marginRight: 10}} className={props.link ? "fas fa-file" : "fas fa-folder"}/>
}