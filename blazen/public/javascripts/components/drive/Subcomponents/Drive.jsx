import React from "react";
import Folder from './Folder/Folder.jsx'

export default props =>
    <div>
        {props.tree.map(node =>
            <Folder
                key={node._id + node.outgoing}
                par={props.par}
                currentItem={props.currentItem}
                username={props.username}
                {...node}
                handleOnClick={
                    props.currentItem === "fas fa-search" ?
                        () => props.handleOnClickSearchItem(node._id, node.name) :
                        node.incoming ?
                            () => props.handleOnClickFolder(node._id, node.name, node.incoming) :
                            () => props.handleOnClickFolder(node._id, node.name)
                }
                handleOnClickDelete={
                    props.currentItem !== "fas fa-trash-alt" ?
                        props.currentItem === "fas fa-share-alt" ?
                            () => props.handleOnClickAction('moveToBinSharedItem', node) :
                            () => props.handleOnClickAction('moveToBin', node._id) :
                        () => props.handleOnClickAction('delete', node._id)
                }
                handleOnClickRestore={() => props.handleOnClickAction('restore', node._id)}
                handleOnClickStar={
                    node.favourite ?
                        () => props.handleOnClickUnFavourite(node._id) :
                        () => props.handleOnClickFavourite(node._id)
                }
                handleOnClickShare={
                    props.currentItem !== "fas fa-share-alt" ?
                        (username) => props.handleOnClickShare(node._id, username) :
                        () => props.handleOnClickAction('unShare', node)
                }
            />)}
    </div>;