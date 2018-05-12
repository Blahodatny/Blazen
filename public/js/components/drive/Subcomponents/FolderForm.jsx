import React, {Component} from "react";

export default class FolderForm extends Component {
    state = {
        input: ''
    };

    isEmpty = (str) => {
        return (!str || 0 === str.length);
    };

    isValid = (str) => {
        return str.length >= this.props.minlength[0]
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let str = this.state.input;
        if (!this.isEmpty(str) && this.isValid(str)) {
            this.props.onSubmit(str);
        }
    };

    render() {
        const disable = this.props.tree.some((element) => {
            return element.name === this.state.input;
        });

        return <div className="input-div">
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    className="folder-input"
                    value={this.state.input}
                    onChange={(event) => this.setState({input: event.target.value})}
                    placeholder="Name of folder..."
                    minLength={this.props.minlength[0]}
                    required
                />

                <button
                    className="disabled_btn"
                    disabled={disable}
                    type="submit">
                    Add folder
                </button>
            </form>
        </div>
    }
}