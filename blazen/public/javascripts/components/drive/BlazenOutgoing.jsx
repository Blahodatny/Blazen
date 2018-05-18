import React from 'react';
import Directory from "./Subcomponents/Directory.jsx";
import Drive from "./Subcomponents/Drive.jsx";

export default props =>
    <div>
        <div className="drive-directory">
            <Directory
                directory={props.directory}
                handleOnClick={props.handleOnClickDirectoryItem}
            />

            <Drive
                tree={props.tree}
                currentItem={props.currentItem}
                par={props.par}
                handleOnClickFolder={props.handleOnClickFolder}
                handleOnClickAction={props.handleOnClickAction}
                handleOnClickUnFavourite={props.handleOnClickUnFavourite}
                handleOnClickFavourite={props.handleOnClickFavourite}
            />
        </div>
    </div>