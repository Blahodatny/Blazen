import React, {Component} from "react";
import Drive from "./Subcomponents/Drive.jsx";

export default class BlazenSearch extends Component {
    state = {
        input: ''
    };

    render() {
        const obj = this.props;
        return <div>
            <input className="search-input"
                type="text"
                value={this.state.input}
                onChange={(event) => this.setState({input: event.target.value})}
                onKeyUp={(event) => obj.handleKeyUpSearch(event)}
                placeholder="Search..."
            />

            <div className="drive-directory">
                <Drive
                    tree={obj.tree}
                    currentItem={obj.currentItem}
                    handleOnClickSearchItem={obj.handleOnClickSearchItem}
                />

                {
                    obj.buttonNext &&
                    <button className="loadMore" onClick={() => obj.handleOnClickLoadMore(this.state.input)}>
                        Load more
                    </button>
                }
            </div>

        </div>
    }
}