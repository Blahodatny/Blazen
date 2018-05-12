import React from "react";

export default class Mail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mail: '' };

        Mail.isEmpty = Mail.isEmpty.bind(this);
        Mail.isValid = Mail.isValid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static isEmpty(str) { return (!str || 0 === str.length); }
    static isValid(str) { return this.props.mail.pattern.test(str)}

    handleChange(event) {
        this.setState({ mail: event.target.value });
        event.target.setCustomValidity('');
    }

    handleBlur(event) {
        console.log("Sign Up: Mail: handleBlur: " + this.state.mail);
        if (Mail.isEmpty(this.state.mail) || !Mail.isValid(this.state.mail)) return;
        event.persist();
        require('axios').get(`/signup/users?type=mail&value=${this.state.mail}`)
            .then(res => {
                console.log('Response from /signup/users: mail: ' + res.data);
                event.target.setCustomValidity(res.data);
                this.props.onSubmit(res.data);
            })
            .catch(console.error);
    }

    render() {
        return <div className="form-label-group">
            <input className="form-control" id="inputEmail" type="email" value={this.state.mail} onChange={this.handleChange}
                   onBlur={this.handleBlur} name="mail" placeholder="Email" required/>
            <label htmlFor="inputEmail">Email</label>
        </div>;
    }
}