import React, {Component} from 'react';
import info from "../../../../../../requests/drive/blazen_share/info";

export default class Share extends Component {
    state = {
        input: '',
        showMenu: false,
        clicked: true
    };

    isValid = (str) => {
        return this.props.username.pattern.test(str)
    };

    handleChange = async (event) => {
        this.setState({input: event.target.value});
        event.persist();
        if (this.isValid(event.target.value)) {
            const res = await info(event.target.value);
            event.target.setCustomValidity(res.data);
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.clicked)
            this.setState({clicked: false}, () => {
                this.props.handleOnClick(this.state.input);
                this.setState({
                    input: '',
                    showMenu: false,
                    clicked: true
                })
            });
    };

    render() {
        const obj = this.props.username;
        return <span>
            {
                this.state.showMenu ?
                    <form style={{display: 'inline-block'}}
                          onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            className="folder-input input-username"
                            value={this.state.input}
                            onChange={(event) => this.handleChange(event)}
                            placeholder="Username..."
                            pattern={obj.pattern.toString().slice(1, -1)}
                            title={obj.validate.message}
                            minLength={obj.minlength[0]}
                            required
                        />

                        <button className="button button-check" type="submit">
                            <i className="fas fa-check"/>
                        </button>
                    </form> :

                    <span className="button"
                          onClick={() => this.setState({showMenu: true})}>
                        <i className="fas fa-share-alt"/>
                    </span>
            }
        </span>
    }
}