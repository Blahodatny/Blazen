import React from 'react';
import BlazenIncoming from "./BlazenIncoming.jsx";
import BlazenOutgoing from "./BlazenOutgoing.jsx";

export default function BlazenShare(props) {
    return <div className="row">
        <div className="col-md-6">
            <BlazenIncoming
                tree={props.treeIncoming}
                directory={props.directoryIncoming}
                currentItem={props.currentItem}
                par={props.parObject}
                handleOnClickFolder={props.handleOnClickFolderIncoming}
                handleOnClickDirectoryItem={props.handleOnClickDirectoryItemIncoming}
            />
        </div>

        <div className="col-md-6">
            <BlazenOutgoing
                tree={props.tree}
                directory={props.directory}
                par={props.par}
                currentItem={props.currentItem}
                handleOnClickDirectoryItem={props.handleOnClickDirectoryItem}
                handleOnClickFolder={props.handleOnClickFolder}
                handleOnClickAction={props.handleOnClickAction}
                handleOnClickUnFavourite={props.handleOnClickUnFavourite}
                handleOnClickFavourite={props.handleOnClickFavourite}
            />
        </div>
    </div>
}