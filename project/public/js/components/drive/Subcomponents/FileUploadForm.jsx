import React, {Component} from "react";

export default class FileUploadForm extends Component {
    state = {
        file: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('item', this.state.file);
        this.props.onSubmit(formData);
    };

    render() {
        const maxSize = 8000000; // maximal size of file can be uploaded = 8000 bytes
        const file = this.state.file;
        const disable = file === null || file === undefined || file === '' ||
            file.size > maxSize ||
            this.props.tree.some((element) => {
                return element.name === file.name;
            });

        return <div className="input-div file-form">
            <form onSubmit={this.handleSubmit}>
                <input type="file"
                       style={{float: "left"}}
                       id="file_upload"
                       onChange={(event) => this.setState({file: event.target.files[0]})}/>

                <button className="disabled_btn" type="submit"
                        disabled={disable}>
                    Upload (max 8MB)
                </button>

                <p>{file ? file.name : ""}</p>

                <label htmlFor="file_upload">
                    <i className="fas fa-plus"/>
                </label>
            </form>
        </div>
    }
}