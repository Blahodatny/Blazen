import React from "react";
import Directory from "./Subcomponents/Directory.jsx";
import Drive from "./Subcomponents/Drive.jsx";

export default props =>
    <div className="drive-directory">
        <Directory
            directory={props.directory}
            handleOnClick={props.handleOnClickDirectoryItem}
        />

        <Drive
            tree={props.tree}
            par={props.par}
            currentItem={props.currentItem + " incoming"}
            handleOnClickFolder={props.handleOnClickFolder}
        />
    </div>