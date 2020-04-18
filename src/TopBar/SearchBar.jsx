import React from 'react';
import AutoCompleteBox from '../AutoCompleteBox/AutoCompleteBox.jsx';
import axios from 'axios';
var _ = require('lodash');


class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            items: [],
            relatedItems: [],
            productFilter: null
        }

        this.debouncedSearch = _.debounce(function () {
            this.searchText(this.state.text);
        }, 200);
    }

    onChange = event => {
        this.setState({ text: event.target.value }, () => {
            //this.searchText(this.state.text);
            this.debouncedSearch();
        });
    }

    searchText = (text) => {
        if (text.trim()) {
            axios.post("/search", { text: this.state.text })
                .then(result => {
                    this.setState({
                        items: result.data
                    });
                })
                .catch(err => console.log(err))
        }

        this.searchRelatedProducts(text);
    }

    searchRelatedProducts = text => {
        if (text.trim()) {
            axios.post("/search_related", { text: this.state.text })
                .then(result => {
                    this.setState({
                        relatedItems: result.data
                    });
                })
                .catch(err => console.log(err))
        }
    }

    setProductFilter = (filter) => {
        console.log("click");
        this.setState({
            productFilter: filter
        })
    }

    render() {
        return (
            <div className="navbar-topbarmiddle-searchbar">
                <input value={this.state.text} name="text" placeholder="Search Best Buy" onChange={this.onChange} />
                {this.state.items.length && this.state.text ? <AutoCompleteBox items={this.state.productFilter ? this.state.items.filter(item => item.name.includes(this.state.productFilter)) : this.state.items} search={this.state.text} setProductFilter={this.setProductFilter}
                    relatedItems={this.state.relatedItems}
                /> : null}
                {this.state.text ?
                    <button className="navbar-clear-search-icon" style={{ "display": "inline-block" }}>
                        <span className="header-close-icon">
                            <img style={{ "maxHeight": "20px" }} src="https://origin-master.s3-us-west-1.amazonaws.com/clear_search.svg" />
                        </span>
                    </button>
                    :
                    null
                }


                <button className="navbar-searchbutton" style={{ "borderRadius": "0 4px 4px 0" }}>
                    <span className="navbar-searchicon">
                        <img src="https://origin-master.s3-us-west-1.amazonaws.com/search_icon.svg" />
                    </span>
                </button>
            </div>
        )
    }

}

export default SearchBar;