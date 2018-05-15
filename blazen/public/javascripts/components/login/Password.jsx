import React from 'react';

export default class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = { password: '' };

        Password.isEmpty = Password.isEmpty.bind(this);
        Password.isValid = Password.isValid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    static isEmpty(str) { return (!str || 0 === str.length); }
    static isValid(str) { return this.props.password.pattern.test(str) && str.length >= 5}

    handleChange(event) {
        this.setState({ password: event.target.value });
        if (!Password.isValid(event.target.value)) event.target.setCustomValidity('Password is wrong!!!');
        else event.target.setCustomValidity('');
    }

    handleKeyUp(event) {
        console.log("Log In: Password: handleKeyUp: " + this.state.password);
        if (Password.isEmpty(this.state.password) || !Password.isValid(this.state.password)) return;
        event.persist();
        require('axios').get(`/login/password?value=${this.state.password}`)
            .then(res => {
                console.log('Response from /login/password ' + res.data);
                event.target.setCustomValidity(res.data);
                this.props.onSubmit(res.data);
            })
            .catch(console.error);
    }

    render() {
        return <div className="form-label-group">
            <input className="form-control" id="inputPassword" type="password" name="password" value={this.state.password} onChange={this.handleChange}
                   onKeyUp={this.handleKeyUp} placeholder="Password" required/>
            <label htmlFor="inputPassword">Password</label>
        </div>
    }
}