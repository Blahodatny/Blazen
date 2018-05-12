import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as Request from './requests/drive';
import Navbar from "./components/drive/Subcomponents/Navbar.jsx";
import BlazenDrive from "./components/drive/BlazenDrive.jsx";
import BlazenBin from "./components/drive/BlazenBin.jsx";
import BlazenSearch from "./components/drive/BlazenSearch.jsx";
import BlazenFavourite from "./components/drive/BlazenFavourite.jsx";
import BlazenShare from "./components/drive/BlazenShare.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: [], // drive of user
            parent: '', // parent folder
            directory: [], // directory to current folder
            currentItem: "fab fa-google-drive", // current navbar item to be uploaded
            page: 1, // page number shown in search
            next: false, // to show or not 'Load more' button
            clicked: true, // to prevent user multiple clicking

            // objects to save state
            Drive: {
                parent: '',
                directory: []
            },

            Bin: {
                parent: 'bin',
                directory: [{
                    _id: 'bin',
                    name: 'bin'
                }]
            },

            Favourite: {
                parent: 'favourites',
                directory: [{
                    _id: "favourites",
                    name: "favourites"
                }]
            },

            Outgoing: {
                parent: "outgoing",
                directory: [{
                    _id: "outgoing",
                    name: "outgoing"
                }]
            },

            Incoming: {
                tree: [],
                parent: 'incoming',
                directory: [{
                    _id: 'incoming',
                    incoming: 'incoming',
                    name: 'incoming'
                }]
            }
        };

        require('axios').get('/drive/tree')
            .then(res => {
                console.log('Tree of registered user has come!!! Respond status: ' + res.status);
                this.setState({
                    tree: res.data.array,
                    parent: res.data.rootId,
                    directory: [{
                        _id: res.data.rootId,
                        name: '#' // root
                    }],
                }, this.setDrive);
            });
    }

    setDrive = () => {
        this.setState(prevState => ({
            Drive: {
                parent: prevState.parent,
                directory: prevState.directory
            }
        }));
    };

    setBin = () => {
        this.setState(prevState => ({
            Bin: {
                parent: prevState.parent,
                directory: prevState.directory
            }
        }))
    };

    setFavourite = () => {
        this.setState(prevState => ({
            Favourite: {
                parent: prevState.parent,
                directory: prevState.directory
            }
        }))
    };

    setOutgoing = () => {
        this.setState(prevState => ({
            Outgoing: {
                parent: prevState.parent,
                directory: prevState.directory
            }
        }))
    };

    setStates = () => {
        this.state.currentItem === "fab fa-google-drive" ?
            this.setDrive() :
            this.state.currentItem === "fas fa-trash-alt" ?
                this.setBin() :
                this.state.currentItem === "fas fa-share-alt" ?
                    this.setOutgoing() :
                    this.state.currentItem === "fas fa-thumbs-up" ?
                        this.setFavourite() : null
    };

    addFolder = (folderName) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = await Request.addFolder(this.state.parent, folderName);
                this.setState(prevState => ({
                    tree: prevState.tree.concat(res.data),
                    clicked: true
                }), this.setDrive);
            });
    };

    addFile = (file) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = await Request.addFile(file, this.state.parent);
                this.setState(prevState => ({
                    tree: prevState.tree.concat(res.data),
                    clicked: true
                }), this.setDrive);
            })
    };

    handleOnClickDirectoryItem = (folderId) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = this.state.currentItem === "fas fa-thumbs-up" ?
                    await Request.getFolderChildrenFavourite(folderId) :
                    this.state.currentItem === "fas fa-share-alt" ?
                        await Request.getFolderChildrenOutgoing(folderId) :
                        folderId === 'bin' ?
                            await Request.rubbishBin() :
                            await Request.getFolderChildren(folderId);
                this.setState(prevState => ({
                    tree: res.data,
                    parent: folderId,
                    directory: prevState.directory.splice(0,
                        prevState.directory.findIndex((element) =>
                            element._id === folderId) + 1),
                    clicked: true
                }), this.setStates);
            });
    };

    handleOnClickFolder = (folderId, folderName) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = this.state.currentItem === "fas fa-thumbs-up" ?
                    await Request.getFolderChildrenFavourite(folderId) :
                    await Request.getFolderChildren(folderId);
                this.setState(prevState => ({
                    tree: res.data,
                    parent: folderId,
                    directory: prevState.directory.concat({
                        _id: folderId,
                        name: folderName
                    }),
                    clicked: true
                }), this.setStates);
            });
    };

    handleOnClickUnFavourite = (itemId) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = await Request.unFavourite(itemId);
                console.log(`Response from /drive/unFavourite: ${res.status} ${res.data}`);
                this.setState(prevState => ({
                    tree: prevState.tree.filter(node => {
                        if (node._id === itemId) {
                            node.favourite = false;
                            if (prevState.currentItem === "fas fa-thumbs-up")
                                return node._id !== itemId
                        }
                        return node;
                    }),
                    clicked: true
                }));
            })
    };

    handleOnClickFavourite = (itemId) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = await Request.favourite(itemId);
                console.log(`Response from /drive/favourite: ${res.status} ${res.data}`);
                this.setState({
                    tree: this.state.tree.map(node => {
                        if (node._id === itemId)
                            node.favourite = true;
                        return node;
                    }),
                    clicked: true
                });
            })
    };

    handleOnClickShare = async (itemId, username) => {
        const res = await Request.share(itemId, username);
        console.log(`Response from /drive/share: ${res.status} ${res.data}`);
    };

    handleOnClickEmpty = () => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = await Request.emptyBin();
                console.log('Rubbish bin has been emptied: ' + res.status + "  " + res.data);
                this.setState({
                    tree: [],
                    parent: 'bin',
                    directory: [{
                        _id: 'bin',
                        name: 'bin'
                    }],
                    clicked: true
                }, this.setBin);
            })
    };

    handleOnClickAction = (action, itemId) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = action === 'delete' ? await Request.deleteItem(itemId) :
                    action === 'moveToBin' ? await Request.moveToBin(itemId) :
                        action === 'restore' ? await Request.restoreItem(itemId) :
                            action === 'unShare' ? await Request.unShare(itemId._id, itemId.outgoing) :
                                action === 'moveToBinSharedItem' ? await Request.moveToBin(itemId._id, itemId.outgoing) : null;
                console.log(`Response: ${res.status} ${res.data}`);
                this.setState(prevState => ({
                    tree: prevState.tree.filter(item =>
                        action === 'unShare' ? item._id !== itemId._id || item.outgoing !== itemId.outgoing :
                            action === 'moveToBinSharedItem' ? item._id !== itemId._id : item._id !== itemId),
                    clicked: true
                }));
            })
    };

    handleKeyUpSearch = async (event) => {
        let name = event.target.value;
        if (!name) {
            this.setState({
                tree: [],
                page: 1,
                next: false
            });
            return;
        }

        const res = await Request.search(name, this.state.page);
        this.setState({
            tree: res.data.list,
            next: res.data.next,
            page: 1
        });
    };

    handleOnClickSearchItem = (itemId, itemName) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                console.log("Item was just clicked: " + itemName);
                const res = await Request.itemInDrive(itemId);
                this.setState({
                    tree: res.data.array,
                    parent: res.data.directory[res.data.directory.length - 1]._id,
                    directory: res.data.directory,
                    clicked: true,
                    currentItem: "fab fa-google-drive"
                }, this.setDrive);
            })
    };

    handleOnClickLoadMore = (name) => {
        if (this.state.clicked)
            this.setState(prevState => ({
                clicked: false,
                page: prevState.page + 1
            }), async () => {
                const res = await Request.search(name, this.state.page);
                this.setState(prevState => ({
                    tree: prevState.tree.concat(res.data.list),
                    next: res.data.next,
                    clicked: true
                }));
            })
    };

    handleOnClickNavbarItem = (itemId) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                if (itemId === "fab fa-google-drive") {
                    const res = await Request.getFolderChildren(this.state.Drive.parent);
                    this.setState(prevState => ({
                        tree: res.data,
                        parent: prevState.Drive.parent,
                        directory: prevState.Drive.directory,
                        clicked: true,
                        currentItem: itemId
                    }));
                }

                else if (itemId === "fas fa-trash-alt") {
                    const res = this.state.Bin.parent === 'bin' ?
                        await Request.rubbishBin() :
                        await Request.getFolderChildren(this.state.Bin.parent);
                    this.setState(prevState => ({
                        tree: res.data,
                        parent: prevState.Bin.parent,
                        directory: prevState.Bin.directory,
                        clicked: true,
                        currentItem: itemId
                    }));
                }

                else if (itemId === "fas fa-search")
                    this.setState({
                        tree: [],
                        clicked: true,
                        currentItem: itemId,
                        page: 1,
                        next: false
                    });

                else if (itemId === "fas fa-thumbs-up") {
                    const res = await Request.getFolderChildrenFavourite(this.state.Favourite.parent);
                    this.setState(prevState => ({
                        tree: res.data,
                        parent: prevState.Favourite.parent,
                        directory: prevState.Favourite.directory,
                        clicked: true,
                        currentItem: itemId
                    }));
                }

                else if (itemId === "fas fa-share-alt") {
                    const res = await Request.getFolderChildrenOutgoing(this.state.Outgoing.parent);
                    const res1 = await Request.getFolderChildrenIncoming(this.state.Incoming.parent,
                        this.state.Incoming.directory[this.state.Incoming.directory.length - 1].incoming);
                    this.setState(prevState => ({
                        tree: res.data,
                        parent: prevState.Outgoing.parent,
                        directory: prevState.Outgoing.directory,
                        Incoming: {
                            tree: res1.data,
                            parent: prevState.Incoming.parent,
                            directory: prevState.Incoming.directory
                        },
                        clicked: true,
                        currentItem: itemId
                    }))
                }

                else if (itemId === "fas fa-cogs") {
                    this.setState({
                        currentItem: "fas fa-cogs",
                        clicked: true
                    })
                }
            });
    };

    handleOnClickDirectoryItemIncoming = (folderId, username) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = await Request.getFolderChildrenIncoming(folderId, username);
                this.setState(prevState => ({
                    Incoming: {
                        tree: res.data,
                        parent: folderId,
                        directory: prevState.Incoming.directory.splice(0,
                            prevState.Incoming.directory.findIndex((element) =>
                                element._id === folderId && element.incoming === username) + 1)
                    },
                    clicked: true
                }));
            });
    };

    handleOnClickFolderIncoming = (folderId, folderName, username) => {
        if (this.state.clicked)
            this.setState({clicked: false}, async () => {
                const res = await Request.getFolderChildrenIncoming(folderId, username);
                this.setState(prevState => ({
                    Incoming: {
                        tree: res.data,
                        parent: folderId,
                        directory: prevState.Incoming.directory.concat({
                            _id: folderId,
                            incoming: username,
                            name: folderName
                        })
                    },
                    clicked: true
                }));
            });
    };

    render() {
        const obj = this.state;
        const navItems = [ // navbar items shown on left side
            {name: "fab fa-google-drive"},
            {name: "fas fa-search"},
            {name: "fas fa-share-alt"},
            {name: "fas fa-thumbs-up"},
            {name: "fas fa-trash-alt"},
            {name: "fas fa-cogs"}
        ];
        return <div className="container-fluid">
            <div className="row">
                <div className="links col-md-auto text-center">
                    <Navbar
                        currentItem={obj.currentItem}
                        navItems={navItems}
                        handleOnClick={this.handleOnClickNavbarItem}
                    />
                </div>
                <div className="col right-content">
                    {
                        this.state.currentItem === "fab fa-google-drive" ?
                            <BlazenDrive
                                username={this.props.username}
                                node={this.props.node}
                                tree={obj.tree}
                                directory={obj.directory}
                                currentItem={obj.currentItem}
                                addFolder={this.addFolder}
                                addFile={this.addFile}
                                handleOnClickDirectoryItem={this.handleOnClickDirectoryItem}
                                handleOnClickFolder={this.handleOnClickFolder}
                                handleOnClickUnFavourite={this.handleOnClickUnFavourite}
                                handleOnClickFavourite={this.handleOnClickFavourite}
                                handleOnClickShare={this.handleOnClickShare}
                                handleOnClickAction={this.handleOnClickAction}
                            /> :

                            this.state.currentItem === "fas fa-trash-alt" ?
                                <BlazenBin
                                    tree={obj.tree}
                                    par={obj.parent}
                                    directory={obj.directory}
                                    currentItem={obj.currentItem}
                                    handleOnClickDirectoryItem={this.handleOnClickDirectoryItem}
                                    handleOnClickFolder={this.handleOnClickFolder}
                                    handleOnClickEmpty={this.handleOnClickEmpty}
                                    handleOnClickAction={this.handleOnClickAction}
                                /> :

                                this.state.currentItem === "fas fa-search" ?
                                    <BlazenSearch
                                        tree={obj.tree}
                                        currentItem={obj.currentItem}
                                        buttonNext={obj.next}
                                        handleKeyUpSearch={this.handleKeyUpSearch}
                                        handleOnClickSearchItem={this.handleOnClickSearchItem}
                                        handleOnClickLoadMore={this.handleOnClickLoadMore}
                                    /> :

                                    this.state.currentItem === "fas fa-thumbs-up" ?
                                        <BlazenFavourite
                                            username={this.props.username}
                                            tree={obj.tree}
                                            directory={obj.directory}
                                            currentItem={obj.currentItem}
                                            handleOnClickDirectoryItem={this.handleOnClickDirectoryItem}
                                            handleOnClickFolder={this.handleOnClickFolder}
                                            handleOnClickAction={this.handleOnClickAction}
                                            handleOnClickUnFavourite={this.handleOnClickUnFavourite}
                                            handleOnClickShare={this.handleOnClickShare}
                                        /> :

                                        this.state.currentItem === "fas fa-share-alt" ?
                                            <BlazenShare
                                                tree={obj.tree}
                                                directory={obj.directory}
                                                par={obj.parent}
                                                currentItem={obj.currentItem}
                                                handleOnClickDirectoryItem={this.handleOnClickDirectoryItem}
                                                handleOnClickFolder={this.handleOnClickFolder}
                                                handleOnClickAction={this.handleOnClickAction}
                                                handleOnClickUnFavourite={this.handleOnClickUnFavourite}
                                                handleOnClickFavourite={this.handleOnClickFavourite}
                                                handleOnClickDirectoryItemIncoming={this.handleOnClickDirectoryItemIncoming}
                                                handleOnClickFolderIncoming={this.handleOnClickFolderIncoming}
                                                treeIncoming={obj.Incoming.tree}
                                                directoryIncoming={obj.Incoming.directory}
                                                parObject={obj.Incoming.parent}
                                            /> : null
                    }
                </div>

                {
                    !this.state.clicked &&
                    <div>
                        <i className="fa fa-spinner fa-spin"/>
                    </div>
                }
            </div>
        </div>
    }
}

module.exports = ReactDOM.render(<App
    node={require('../../server/configs/db/nodeModel')}
    username={require('../../server/configs/db/userModel').username}
/>, document.getElementById('drive'));