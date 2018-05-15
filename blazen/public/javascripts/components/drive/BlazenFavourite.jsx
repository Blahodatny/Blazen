import React from 'react';
import Directory from "./Subcomponents/Directory.jsx";
import Drive from "./Subcomponents/Drive.jsx";

export default function BlazenFavourite(props) {
    return <div>
        <div className="drive-directory">
            <Directory
                directory={props.directory}
                handleOnClick={props.handleOnClickDirectoryItem}
            />

            <Drive
                username={props.username}
                tree={props.tree}
                currentItem={props.currentItem}
                handleOnClickFolder={props.handleOnClickFolder}
                handleOnClickAction={props.handleOnClickAction}
                handleOnClickUnFavourite={props.handleOnClickUnFavourite}
            />
        </div>
    </div>
}