import React from "react";
import Directory from "./Subcomponents/Directory.jsx";
import Drive from "./Subcomponents/Drive.jsx";

export default props =>
    <div>
        <button className="loadMore"
                onClick={props.handleOnClickEmpty}
                disabled=
                    {
                        props.par === "bin" ?
                            props.tree.length === 0 ||
                            typeof props.tree === undefined :
                            false
                    }>
            Empty
        </button>

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
            />
        </div>
    </div>