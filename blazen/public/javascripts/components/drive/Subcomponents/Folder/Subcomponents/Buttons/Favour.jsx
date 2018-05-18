import React from "react";

export default props =>
    <span className="button"
          onClick={props.handleOnClick}>
        <i className={props.favourite ? "fas fa-star" : "far fa-star"}/>
    </span>