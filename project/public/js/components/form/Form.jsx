import React from "react";
import Name from "./Name.jsx";
import Username from "./info/Username.jsx";
import Mail from "./info/Mail.jsx";
import Password from "./Password.jsx";

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mailMessage: 'That mail has been taken!!!',
            usernameMessage: 'That username already exists!!!'
        };

        Form.isEmpty = Form.isEmpty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
        this.handleSubmitMail = this.handleSubmitMail.bind(this);
    }

    static isEmpty(str) { return (!str || 0 === str.length); }
    handleSubmit(event) {
        if (!Form.isEmpty(this.state.mailMessage) || !Form.isEmpty(this.state.usernameMessage)) {
            event.preventDefault();
            console.log("Unable to submit the form!!!");
        }
    }

    handleSubmitUsername(value) { this.setState({ usernameMessage: value }); }
    handleSubmitMail(value) { this.setState({ mailMessage: value })}

    render() {
        const obj = this.props.user;
        return <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data" autoComplete="on">
            <h1>New User</h1><br/>
            <div className="info">Sign Up to upload and share your files</div><br/>
            <Name nameOfUser={obj.name} surnameOfUser={obj.familyName}/><br/>
            <fieldset accessKey="i">
                <legend>Info</legend>
                <Username username={obj.username} onSubmit={this.handleSubmitUsername}/>
                <Mail mail={obj.mail} onSubmit={this.handleSubmitMail}/>
            </fieldset>
            <br/>
            <Password password={obj.password}/><br/>

            <button className="btn btn-lg btn-primary" style={{marginRight: 4}} type="submit">Sign Up</button>
            <button className="btn btn-outline-success" type="reset">Start Over</button><hr/>
            <div className="info">
                Have an account? <a href="/login">Log In</a>
            </div>
        </form>
    }
};