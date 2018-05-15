import React from "react";

export default class Username extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };

        Username.isEmpty = Username.isEmpty.bind(this);
        Username.isValid = Username.isValid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static isEmpty(str) { return (!str || 0 === str.length); }
    static isValid(str) { return this.props.username.pattern.test(str)}

    handleChange(event) {
        this.setState({ username: event.target.value });
        event.target.setCustomValidity('');
    }

    handleBlur(event) {
        console.log("Sign Up: Username: handleBlur: " + this.state.username);
        if (Username.isEmpty(this.state.username) || !Username.isValid(this.state.username)) return;
        event.persist();
        require('axios').get(`/signup/users?type=username&value=${this.state.username}`)
            .then(res => {
                console.log('Response from signup/users: username: ' + res.data);
                event.target.setCustomValidity(res.data);
                this.props.onSubmit(res.data);
            })
            .catch(console.error);
    }

    render() {
        const un = this.props.username;
        return <div className="form-label-group">
            <input className="form-control" id="inputUsername" type="text" value={this.state.username}
                   onChange={this.handleChange} onBlur={this.handleBlur} name="username" placeholder="Enter username"
                   pattern={un.pattern.toString().slice(1, -1)} title={un.validate.message} minLength={un.minlength[0]} required/>
            <label htmlFor="inputUsername">Enter username</label>
        </div>;
    }
}