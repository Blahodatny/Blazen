import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/form/Form.jsx";

module.exports = ReactDOM.render(<Form
    user={require('./../../configs/db/userModel')}/>, document.getElementById('form-input'));