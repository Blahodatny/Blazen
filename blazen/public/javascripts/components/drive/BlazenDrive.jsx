import React from "react";
import FolderForm from "./Subcomponents/FolderForm.jsx";
import FileUploadForm from "./Subcomponents/FileUploadForm.jsx";
import Directory from "./Subcomponents/Directory.jsx";
import Drive from "./Subcomponents/Drive.jsx";

export default props =>
    <div>
        <div className="navbar-inputs">
            <FolderForm
                {...props.node.name}
                tree={props.tree}
                onSubmit={props.addFolder}
            />

            <FileUploadForm
                tree={props.tree}
                onSubmit={props.addFile}
            />
        </div>

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
                handleOnClickFavourite={props.handleOnClickFavourite}
                handleOnClickShare={props.handleOnClickShare}
            />
        </div>
    </div>