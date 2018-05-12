import React from "react";
import DirectoryItem from "./DirectoryItem/DirectoryItem.jsx";

export default function Directory(props) {
    return <div style={{paddingLeft: 10}}>
        {props.directory.map(item =>
            <DirectoryItem
                key={item._id}
                handleOnClick={item.incoming ?
                    () => props.handleOnClick(item._id, item.incoming) :
                    () => props.handleOnClick(item._id)}
                name={item.name}
            />)}
    </div>
};