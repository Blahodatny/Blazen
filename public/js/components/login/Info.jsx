import React from 'react';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = { info: '' };

        Info.isEmpty = Info.isEmpty.bind(this);
        Info.isValid = Info.isValid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    static isEmpty(str) { return (!str || 0 === str.length); }
    static isValid(str) { return this.props.username.pattern.test(str) || this.props.mail.pattern.test(str)}

    handleChange(event) {
        this.setState({ info: event.target.value });
        if (!Info.isValid(event.target.value)) event.target.setCustomValidity('There are no user with such username or mail!!!');
        else event.target.setCustomValidity('');
    }

    handleKeyUp(event) {
        console.log("Log In: Info: handleKeyUp: " + this.state.info);
        if (Info.isEmpty(this.state.info) || !Info.isValid(this.state.info)) return;
        event.persist();
        require('axios').get(`/login/info?value=${this.state.info}`)
            .then(res => {
                console.log('Response from /login/info ' + res.data);
                event.target.setCustomValidity(res.data);
                this.props.onSubmit(res.data);
            })
            .catch(console.error);
    }

    render() {
        return <div className="form-label-group">
            <input className="form-control" id="inputInfo" type="text" name="username" value={this.state.info} onChange={this.handleChange}
                   onKeyUp={this.handleKeyUp} placeholder="Username or email" required/>
            <label htmlFor="inputInfo">Username or email</label>
        </div>
    }
}