import React from "react";

export default props => {
    const reg = (/(gif|jpg|jpeg|tiff|png|jpe|bmp)$/i);
    const test = reg.test(props.format);
    return <span>
        <a className="file-node"
           onClick={
               (props.link && props.currentItem !== "fas fa-search") ?
                   test ?
                       props.handleOnClickPicture :
                       null :
                   props.handleOnClick
           }

           href={test ? null : props.link}

           target={test ? null : "_blank"}>
            {props.name}
        </a>
        {
            props.outgoing ?
                <span className="user-share">
                    shared to {props.outgoing}
                    </span> :
                props.incoming ?
                    props.par === 'incoming' &&
                    <span className="user-share">
                        shared by {props.incoming}
                        </span> : null
        }
    </span>
}