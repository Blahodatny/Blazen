import React, {Component} from "react";
import download from '../../../../requests/download.js';
import ItemIcon from './Subcomponents/ItemIcon.jsx';
import ItemName from './Subcomponents/ItemName.jsx';
import MoveToBin from './Subcomponents/Buttons/MoveToBin.jsx';
import Favour from './Subcomponents/Buttons/Favour.jsx';
import Download from './Subcomponents/Buttons/Download.jsx';
import RemoveIrretrievably from './Subcomponents/Buttons/RemoveIrretrievably.jsx';
import Restore from "./Subcomponents/Buttons/Restore.jsx";
import Share from "./Subcomponents/Buttons/Share.jsx";
import UnShare from "./Subcomponents/Buttons/UnShare.jsx";
import Lightbox from 'react-image-lightbox';

export default class Folder extends Component {
    state = {
        clickOnFile: true,
        showMenu: false,
        visiblePictureViewer: false
    };

    handleOnClick = () => {
        this.setState(prevState => ({showMenu: !prevState.showMenu}))
    };

    handleOnClickPicture = () => {
        if (this.state.clickOnFile)
            this.setState({clickOnFile: false}, () => {
                this.setState(prevState => ({
                    visiblePictureViewer: !prevState.visiblePictureViewer
                }))
            })
    };

    handleOnClickDownload = () => {
        if (this.state.clickOnFile)
            this.setState({clickOnFile: false}, () => {
                let x = new XMLHttpRequest();
                const obj = this.props;
                x.open("GET", obj.link, true);
                x.responseType = 'blob';
                x.onload = () => download(x.response, obj.name, `file/${obj.format}`);
                x.send();
                this.setState({clickOnFile: true});
            })
    };

    render() {
        const obj = this.props;
        const currentState = obj.currentItem !== "fas fa-trash-alt";
        const showActions = obj.currentItem !== "fas fa-search" && obj.currentItem !== "fas fa-share-alt incoming";
        return <div className="tree-item">
            <ItemIcon link={obj.link}/>

            <div style={{fontSize: '1.25em', fontWeight: 'bold', display: 'inline-block'}}>
                <ItemName
                    currentItem={obj.currentItem}
                    handleOnClick={obj.handleOnClick}
                    handleOnClickPicture={this.handleOnClickPicture}
                    par={obj.par}
                    {...obj}
                />

                {
                    showActions && (this.state.showMenu ?
                        <span className="buttons">
                            {
                                currentState ?
                                    <span>
                                        {
                                            obj.currentItem !== "fas fa-share-alt" &&
                                                <Share
                                                    handleOnClick={obj.handleOnClickShare}
                                                    username={obj.username}
                                                />
                                        }

                                        {
                                            obj.par === "outgoing" &&
                                                <UnShare handleOnClick={obj.handleOnClickShare}/>
                                        }

                                        <MoveToBin handleOnClick={obj.handleOnClickDelete}/>

                                        <Favour
                                            handleOnClick={obj.handleOnClickStar}
                                            favourite={obj.favourite}
                                        />

                                        {
                                            obj.link &&
                                            <Download handleOnClick={this.handleOnClickDownload}/>
                                        }
                                    </span> :

                                    <span>
                                        <RemoveIrretrievably handleOnClick={obj.handleOnClickDelete}/>

                                        {
                                            obj.par === "bin" &&
                                            <Restore handleOnClick={obj.handleOnClickRestore}/>
                                        }
                                        </span>
                            }

                            <i className="right-arrow"
                               onClick={this.handleOnClick}>
                                <i className="fas fa-angle-left"/>
                            </i>
                        </span> :

                        <i className="more"
                           onClick={this.handleOnClick}>
                            <i className="fas fa-ellipsis-v"/>
                        </i>)
                }
            </div>

            {
                this.state.visiblePictureViewer &&
                <Lightbox
                    mainSrc={obj.link}
                    onCloseRequest={() => {
                        this.setState({clickOnFile: true}, () => {
                            this.setState(prevState => ({
                                visiblePictureViewer: !prevState.visiblePictureViewer
                            }))
                        })
                    }}
                />
            }
        </div>
    }
}