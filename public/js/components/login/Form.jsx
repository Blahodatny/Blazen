import React from 'react';
import Info from './Info.jsx';
import Password from './Password.jsx';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoMessage: 'There are no user with such username or mail!!!',
            passwordMessage: 'Password is wrong!!!'
        };

        Form.isEmpty = Form.isEmpty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    }

    static isEmpty(str) { return (!str || 0 === str.length); }
    handleSubmit(event) {
        setTimeout(() => console.log('You are inside of login/Form: handleSubmit!!!'), 2000);
        if (!Form.isEmpty(this.state.infoMessage) || !Form.isEmpty(this.state.passwordMessage)) {
            event.preventDefault();
            console.log("Unable to submit the form!!!");
        }
    }
    handleSubmitInfo(value) { this.setState({ infoMessage: value }); }
    handleSubmitPassword(value) { this.setState({ passwordMessage: value})}

    render() {
        const obj = this.props.user;
        return <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data" autoComplete="on">
            <h1>Blazen</h1><br/>

            <Info username={obj.username} mail={obj.mail} onSubmit={this.handleSubmitInfo}/>
            <Password password={obj.password} onSubmit={this.handleSubmitPassword}/>

            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" defaultValue="remember-me"/> Remember me
                </label>
            </div>
            <button className="btn btn-lg btn-primary" style={{width: '100%'}} type="submit">Log In</button>
            <hr/>
            <div className="info">
                Don't have an account? <a href="/signup">Sign Up</a>
            </div>
        </form>
    }
}